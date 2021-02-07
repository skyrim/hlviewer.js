import { basename } from '../Util'
import { ReplayChunk } from './ReplayChunk'

export class ReplayMap {
  name: string
  chunks: ReplayChunk[]
  resources: any

  constructor(mapFilePath: string) {
    this.name = basename(mapFilePath, '.bsp')
    this.chunks = []
    this.resources = {
      sounds: [],
      skins: [],
      models: [],
      decals: [],
      custom: [],
      events: []
    }
  }

  setResources(resources: any[]) {
    resources.forEach(res => {
      switch (res.type) {
        case 0: {
          res.used = false
          this.resources.sounds.push(res)
          break
        }
        case 1: {
          this.resources.skins.push(res)
          break
        }
        case 2: {
          this.resources.models.push(res)
          break
        }
        case 3: {
          this.resources.decals.push(res)
          break
        }
        case 4: {
          this.resources.custom.push(res)
          break
        }
        case 5: {
          this.resources.events.push(res)
          break
        }
      }
    })
  }

  addChunk(chunk: ReplayChunk) {
    this.chunks.push(chunk)
  }
}
