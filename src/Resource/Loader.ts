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
  batchStart,
  batchFinish,
  itemStart,
  itemFinish,
  itemProgress
}

type LoadListenerBatchStartFn = () => void
type LoadListenerBatchStart = {
  type: LoadListenerType.batchStart
  listener: LoadListenerBatchStartFn
}

type LoadListenerBatchFinishFn = (error: string) => void
type LoadListenerBatchFinish = {
  type: LoadListenerType.batchFinish
  listener: LoadListenerBatchFinishFn
}

type LoadListenerItemStartFn = (type: ResourceType, name: string) => void
type LoadListenerItemStart = {
  type: LoadListenerType.itemStart
  listener: LoadListenerItemStartFn
}

type LoadListenerItemFinishFn = (type: ResourceType, name: string) => void
type LoadListenerItemFinish = {
  type: LoadListenerType.itemFinish
  listener: LoadListenerItemFinishFn
}

type LoadListenerItemProgressFn = (
  type: ResourceType,
  name: string,
  progress: number
) => void
type LoadListenerItemProgress = {
  type: LoadListenerType.itemProgress
  listener: LoadListenerItemProgressFn
}

type LoadListener =
  | LoadListenerBatchStart
  | LoadListenerBatchFinish
  | LoadListenerItemStart
  | LoadListenerItemFinish
  | LoadListenerItemProgress

export class Loader {
  public static init(fetchFn: FetchFunction): Loader {
    return new Loader(fetchFn)
  }

  private fetchFn: FetchFunction
  private listeners: LoadListener[] = []
  private groups: {
    [name: string]: {
      progress: number
      resources: Resource[]
    }
  } = {}

  private constructor(fetchFn: FetchFunction) {
    this.fetchFn = fetchFn
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
      if (listener.type === LoadListenerType.itemStart) {
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
            const total = resources.reduce((p, c) => c.progress + p, 0)
            const count = resourceGroup.resources.length

            resource.progress = progress
            resourceGroup.progress = total / count

            for (let i = 0; i < this.listeners.length; ++i) {
              const listener = this.listeners[i]
              if (listener.type === LoadListenerType.itemProgress) {
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
              if (listener.type === LoadListenerType.itemFinish) {
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
              if (listener.type === LoadListenerType.itemFinish) {
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

  private runBatchStartListeners() {
    console.log(1)
    for (let i = 0; i < this.listeners.length; ++i) {
      const listener = this.listeners[i]
      if (listener.type === LoadListenerType.batchStart) {
        listener.listener()
      }
    }
  }

  private runBatchFinishListeners(error: string) {
    for (let i = 0; i < this.listeners.length; ++i) {
      const listener = this.listeners[i]
      if (listener.type === LoadListenerType.batchFinish) {
        listener.listener(error)
      }
    }
  }

  async load(name: string): Promise<LoadResult> {
    this.runBatchStartListeners()

    const bag: {
      replay: ReplayChunks | undefined
      map: Bsp | undefined
      sounds: Sound[]
      fonts: WadFont[]
      textures: Texture[]
      sprites: Sprite[]
      models: Mdl[]
    } = {
      replay: undefined,
      map: undefined,
      sounds: [],
      fonts: [],
      textures: [],
      sprites: [],
      models: []
    }

    if (name.slice(-4) === '.dem') {
      const replayFile = await this.queue(ResourceType.replay, name, 'replay')
      if (replayFile.error || !replayFile.buffer) {
        this.runBatchFinishListeners('TODO')
        return { type: 'error', reason: 'Failed to load replay file' }
      }
      try {
        bag.replay = Replay.parseIntoChunks(replayFile.buffer)
      } catch (e) {
        this.runBatchFinishListeners('TODO')
        return {
          type: 'error',
          reason: `Failed to parse replay file (${name})`
        }
      }
    }

    let mapName = ''
    if (bag.replay) {
      mapName = bag.replay.maps[0].name + '.bsp'
    } else if (name.slice(-4) === '.bsp') {
      mapName = name
    } else {
      this.runBatchFinishListeners('TODO')
      return {
        type: 'error',
        reason: 'Invalid file name. Expected .dem or .bsp'
      }
    }

    const mapFile = await this.queue(ResourceType.map, mapName, 'map')
    if (mapFile.error || !mapFile.buffer) {
      this.runBatchFinishListeners('TODO')
      return { type: 'error', reason: 'Failed to load map file' }
    }
    try {
      bag.map = BspParser.parse(mapName, mapFile.buffer)
    } catch (e) {
      this.runBatchFinishListeners('TODO')
      return {
        type: 'error',
        reason: `Failed to parse map file (${mapName})`
      }
    }

    if (bag.replay) {
      const soundPromises: {
        name: string
        index: number
        promise: Promise<Resource>
      }[] = []
      const soundNames = bag.replay.maps[0].resources.sounds
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

    bag.textures = bag.map.textures
      .filter(a => !a.isExternal)
      .map(a => new Texture(a.name, a.width, a.height, a.data))
    const wads: string[] = bag.map.entities[0].wad
    const externalTextures = bag.map.textures.filter(a => a.isExternal)
    const externalTextureFiles = await Promise.all(
      externalTextures.map(a =>
        this.queue(ResourceType.texture, a.name, 'texture', wads)
      )
    )
    for (let i = 0; i < externalTextures.length; ++i) {
      const a = externalTextures[i]

      const file = externalTextureFiles[i]
      if (!file.error && file.buffer) {
        const blob = new Blob([file.buffer], { type: 'image/png' })
        const image = new Image()
        await new Promise((resolve) => {
          image.onload = resolve
          image.src = window.URL.createObjectURL(blob)
        })
        const canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          break
        }
        ctx.drawImage(image, 0, 0)
        console.log(image)
        const data = ctx.getImageData(0, 0, canvas.width, canvas.height)
        

        bag.textures.push(
          Texture.fromUint8ClampedArray(a.name, a.width, a.height, data.data)
        )
      }
    }
    // console.log(externalTextures)

    this.runBatchFinishListeners('TODO')
    return {
      type: 'success',
      resources: {
        replay: bag.replay,
        map: bag.map,
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
