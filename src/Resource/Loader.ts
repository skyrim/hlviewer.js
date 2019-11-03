import { Bsp } from '../Bsp'
import { Sound } from '../Sound'
import { WadFont } from '../Parsers/Wad'
import { Sprite } from '../Parsers/Sprite'
import { Mdl } from '../Parsers/MdlParser'
import { Texture } from '../Graphics/Texture'
import { ResourceType } from './ResourceType'
import { FetchFunction } from './FetchFunction'
import { BspParser } from '../Parsers/BspParser'
import { Replay, ReplayChunks } from '../Replay/Replay'

export enum ResourceStatus {
  loading,
  ok,
  error
}

type Resource = {
  status: ResourceStatus
  file: string
  progress: number
  buffer: ArrayBuffer | null
  error?: string
  cancel: () => void
}

type LoadResultError = {
  type: 'error'
  reason: string
}

type LoadResultCancel = {
  type: 'cancel'
}

export type ResourceBag = {
  replay?: ReplayChunks
  map: Bsp
  textures: Texture[]
  fonts: WadFont[]
  sounds: Sound[]
  sprites: Sprite[]
  models: Mdl[]
}

type LoadResultSuccess = {
  type: 'success'
  resources: ResourceBag
}

type LoadResult = LoadResultError | LoadResultCancel | LoadResultSuccess

export enum LoadListenerType {
  start,
  progress,
  finish
}

type LoadListenerStartFn = (type: ResourceType, name: string) => void
type LoadListenerStart = {
  type: LoadListenerType.start
  listener: LoadListenerStartFn
}

type LoadListenerFinishFn = (type: ResourceType, name: string) => void
type LoadListenerFinish = {
  type: LoadListenerType.finish
  listener: LoadListenerFinishFn
}

type LoadListenerProgressFn = (
  type: ResourceType,
  name: string,
  progress: number
) => void
type LoadListenerProgress = {
  type: LoadListenerType.progress
  listener: LoadListenerProgressFn
}

type LoadListener =
  | LoadListenerStart
  | LoadListenerFinish
  | LoadListenerProgress

export class Loader {
  public static init(fetchFn: FetchFunction): Loader {
    return new Loader(fetchFn)
  }

  private fetchFn: FetchFunction
  private groups: {
    [name: string]: {
      progress: number
      resources: Resource[]
    }
  } = {}
  private listeners: LoadListener[] = []

  private constructor(fetchFn: FetchFunction) {
    this.fetchFn = fetchFn
    this.addListener({ type: LoadListenerType.start, listener: () => {} })
  }

  addListener(listener: LoadListener) {
    this.listeners.push(listener)
  }

  removeListener(listener: LoadListener) {
    this.listeners = this.listeners.filter(
      a => !(a.type === listener.type && a.listener === listener.listener)
    )
  }

  clear() {
    this.groups = {}
  }

  async queue(
    type: ResourceType,
    file: string,
    group?: string,
    wads: string[] = []
  ): Promise<Resource> {
    const name = file

    for (let i = 0; i < this.listeners.length; ++i) {
      const listener = this.listeners[i]
      if (listener.type === LoadListenerType.start) {
        listener.listener(type, name)
      }
    }

    const groupName = group || 'other'

    if (!this.groups[groupName]) {
      this.groups[groupName] = { progress: 0, resources: [] }
    }

    const resourceGroup = this.groups[groupName]

    return new Promise<Resource>(resolve => {
      const resource: Resource = {
        status: ResourceStatus.loading,
        file,
        progress: 0,
        buffer: null,
        cancel: this.fetchFn(type, name, wads).subscribe({
          progress: progress => {
            const resources = resourceGroup.resources
            const total = resources.reduce(
              (prev, cur) => cur.progress + prev,
              0
            )
            const count = resourceGroup.resources.length

            resource.progress = progress
            resourceGroup.progress = total / count

            for (let i = 0; i < this.listeners.length; ++i) {
              const listener = this.listeners[i]
              if (listener.type === LoadListenerType.progress) {
                listener.listener(type, name, progress)
              }
            }
          },
          error: err => {
            resource.progress = 1
            resource.status = ResourceStatus.error
            resource.error = err.toString()

            for (let i = 0; i < this.listeners.length; ++i) {
              const listener = this.listeners[i]
              if (listener.type === LoadListenerType.finish) {
                listener.listener(type, name)
              }
            }

            resolve(resource)
          },
          complete: buffer => {
            resource.buffer = buffer
            resource.progress = 1
            resource.status = ResourceStatus.ok

            for (let i = 0; i < this.listeners.length; ++i) {
              const listener = this.listeners[i]
              if (listener.type === LoadListenerType.finish) {
                listener.listener(type, name)
              }
            }

            resolve(resource)
          }
        })
      }

      resourceGroup.resources.push(resource)
    })
  }

  async load(name: string): Promise<LoadResult> {
    const bag: {
      replays: ReplayChunks[]
      maps: Bsp[]
      sounds: Sound[]
      fonts: WadFont[]
      textures: Texture[]
      sprites: Sprite[]
      models: Mdl[]
    } = {
      replays: [],
      maps: [],
      sounds: [],
      fonts: [],
      textures: [],
      sprites: [],
      models: []
    }

    if (name.slice(-4) === '.dem') {
      const replayFile = await this.queue(ResourceType.replay, name, 'replay')
      if (replayFile.error || !replayFile.buffer) {
        return { type: 'error', reason: 'Failed to load replay file' }
      }
      bag.replays.push(Replay.parseIntoChunks(replayFile.buffer))
    }

    let mapName = ''
    if (bag.replays.length) {
      mapName = bag.replays[0].maps[0].name + '.bsp'
    } else if (name.slice(-4) === '.bsp') {
      mapName = name
    } else {
      return {
        type: 'error',
        reason: 'Invalid file name. Expected .dem or .bsp'
      }
    }

    const mapFile = await this.queue(ResourceType.map, mapName, 'map')
    if (mapFile.error || !mapFile.buffer) {
      return { type: 'error', reason: 'Failed to load map file' }
    }
    bag.maps.push(BspParser.parse(mapName, mapFile.buffer))

    if (bag.replays.length) {
      const soundPromises: {
        name: string
        index: number
        promise: Promise<Resource>
      }[] = []
      const soundNames = bag.replays[0].maps[0].resources.sounds
      for (let i = 0; i < soundNames.length; ++i) {
        const name = soundNames[i].name
        if (soundNames[i].used) {
          soundPromises.push({
            name: soundNames[i].name,
            index: soundNames[i].index,
            promise: this.queue(ResourceType.sound, name, 'sound')
          })
        }
      }
      const soundFiles = await Promise.all(soundPromises.map(a => a.promise))
      bag.sounds = (await Promise.all(
        soundFiles.map((a, i) => {
          return new Promise<Sound | null>(resolve => {
            if (a.buffer) {
              Sound.create(a.buffer).then(s => {
                resolve(s)

                s.name = soundPromises[i].name
                s.index = soundPromises[i].index
              })
            } else {
              resolve(null)
            }
          })
        })
      )).filter(a => a) as Sound[]
    }

    bag.textures = bag.maps[0].textures
      .filter(a => !a.isExternal)
      .map(a => new Texture(a.name, a.width, a.height, a.data))

    return {
      type: 'success',
      resources: {
        replay: bag.replays[0],
        map: bag.maps[0],
        textures: bag.textures,
        fonts: bag.fonts,
        sounds: bag.sounds,
        sprites: bag.sprites,
        models: bag.models
      }
    }
  }

  cancel() {}
}
