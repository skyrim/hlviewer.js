import { Bsp } from '../Bsp'
import { Sound } from '../Sound'
import { WadFont } from '../Parsers/Wad'
import { Replay } from '../Replay/Replay'
import { Sprite } from '../Parsers/Sprite'
import { Mdl } from '../Parsers/MdlParser'
import { Texture } from '../Graphics/Texture'
import { FetchFunction } from './FetchFunction'
import { ResourceTypes } from './ResourceTypes'

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
}

type LoadResultError = {
  type: 'error'
  reason: string
}

type LoadResultCancel = {
  type: 'cancel'
}

export type ResourceBag = {
  replay?: Replay
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

type LoadListenerStartFn = (type: string, name: string) => void
type LoadListenerStart = {
  type: LoadListenerType.start
  listener: LoadListenerStartFn
}

type LoadListenerFinishFn = (type: string, name: string) => void
type LoadListenerFinish = {
  type: LoadListenerType.finish
  listener: LoadListenerFinishFn
}

type LoadListenerProgressFn = (
  type: string,
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

  queue(file: string, group?: string) {
    const type = 'TODO'
    const name = file

    const resource: Resource = {
      status: ResourceStatus.loading,
      file,
      progress: 0,
      buffer: null
    }

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
    resourceGroup.resources.push(resource)

    this.fetchFn(ResourceTypes.replay, '').subscribe({
      progress: progress => {
        const resources = resourceGroup.resources
        const total = resources.reduce((prev, cur) => cur.progress + prev, 0)
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
      }
    })
  }

  /**
   * Load the file, check file type if it is replay or map
   * if not error
   * if replay load map
   * if map continue loading other files
   *
   * @param name Replay or map name
   */
  async load(name: string): Promise<LoadResult> {
    const x = this.queue(name)

    return {
      type: 'success',
      resources: {
        map: {} as Bsp,
        textures: [],
        fonts: [],
        sounds: [],
        sprites: [],
        models: []
      }
    }
  }

  cancel() {}
}
