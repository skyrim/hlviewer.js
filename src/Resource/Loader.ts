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

/**
 * Loader's job is to track what resources are currently loading,
 * their progress and what resources have done loading.
 *
 * Actual job of loading the data is delegated to a Fetcher.
 */
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
    group?: string
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
        cancel: this.fetchFn(type, name).subscribe({
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
    if (name.slice(-4) === '.dem') {
      const replayFile = await this.queue(ResourceType.replay, name, 'replay')
      if (replayFile.error || !replayFile.buffer) {
        return {
          type: 'error',
          reason: 'Failed to load replay file'
        }
      }
      const replay = Replay.parseIntoChunks(replayFile.buffer)

      const mapName = replay.maps[0].name + '.bsp'
      const mapFile = await this.queue(ResourceType.map, mapName, 'map')
      if (mapFile.error || !mapFile.buffer) {
        return {
          type: 'error',
          reason: 'Failed to load map file'
        }
      }
      const map = BspParser.parse(mapName, mapFile.buffer)

      const soundPromises: {
        name: string,
        index: number,
        promise:Promise<Resource>
      }[] = []
      const soundNames = replay.maps[0].resources.sounds
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
      const sounds = await Promise.all(
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
      )

      return {
        type: 'success',
        resources: {
          replay,
          map,
          textures: [],
          fonts: [],
          sounds: sounds.filter(a => a) as Sound[],
          sprites: [],
          models: []
        }
      }
    } else if (name.slice(-4) === '.bsp') {
      const mapFile = await this.queue(ResourceType.map, name, 'map')
      if (mapFile.error || !mapFile.buffer) {
        return {
          type: 'error',
          reason: 'Failed to load map file'
        }
      }
      const map = BspParser.parse(
        name.slice(0, name.length - 4),
        mapFile.buffer
      )

      return {
        type: 'success',
        resources: {
          map,
          textures: [],
          fonts: [],
          sounds: [],
          sprites: [],
          models: []
        }
      }
    } else {
      return {
        type: 'error',
        reason: 'Invalid file extension. Expected either .dem or .bsp'
      }
    }
  }

  cancel() {}
}
