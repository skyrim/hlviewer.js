import { Fetcher } from './Fetcher'
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

/**
 * Loader's job is to track what resources are currently loading,
 * their progress and what resources have done loading.
 *
 * Actual job of loading the data is delegated to a Fetcher.
 */
export class Loader {
  public static init(fetcher: Fetcher): Loader {
    return new Loader(fetcher)
  }

  private fetcher: Fetcher
  private groups: {
    [name: string]: {
      progress: number
      resources: Resource[]
    }
  } = {}

  private constructor(fetcher: Fetcher) {
    this.fetcher = fetcher
  }

  clear() {
    this.groups = {}
  }

  load(file: string, group?: string) {
    const resource: Resource = {
      status: ResourceStatus.loading,
      file,
      progress: 0,
      buffer: null
    }

    const groupName = group || 'other'

    if (!this.groups[groupName]) {
      this.groups[groupName] = { progress: 0, resources: [] }
    }

    const resourceGroup = this.groups[groupName]
    resourceGroup.resources.push(resource)

    this.fetcher(ResourceTypes.replay, '').subscribe({
      progress: val => {
        resource.progress = val
        resourceGroup.progress =
          resourceGroup.resources.reduce(
            (prev, cur) => cur.progress + prev,
            0
          ) / resourceGroup.resources.length
      },
      error: err => {
        resource.progress = 1
        resource.status = ResourceStatus.error
        resource.error = err.toString()
      },
      complete: buffer => {
        resource.buffer = buffer
        resource.progress = 1
        resource.status = ResourceStatus.ok
      }
    })
  }
}
