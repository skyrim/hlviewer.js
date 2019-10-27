import { xhr } from './Xhr'
import { Fetcher } from './Fetcher'
import { ResourceTypes } from './ResourceTypes'
import { basename, extname, assertUnreachable } from '../Util'

const resolveUrl = (type: ResourceTypes, name: string): string => {
  const extension = extname(name)
  const bname = basename(name, extension)

  switch (type) {
    case ResourceTypes.replay: {
      return `/res/replays/${bname}.dem`
    }
    case ResourceTypes.map: {
      return `/res/maps/${bname}.bsp`
    }
    case ResourceTypes.wad: {
      return `/res/wads/${bname}.wad`
    }
    case ResourceTypes.texture: {
      return `/res/textures/${bname}.png`
    }
    case ResourceTypes.font: {
      return `/res/fonts/${bname}.png`
    }
    case ResourceTypes.sky: {
      return `/res/skies/${bname}.tga`
    }
    case ResourceTypes.sound: {
      return `/res/sounds/${bname}.wav`
    }
    case ResourceTypes.sprite: {
      return `/res/sprites/${bname}.spr`
    }
    case ResourceTypes.model: {
      return `/res/models/${bname}.mdl`
    }
  }

  assertUnreachable(type)
}

export const defaultFetcher: Fetcher = (type, name) => {
  const url = resolveUrl(type, name)
  const req = xhr(url, {
    isBinary: true
  })
  return req
}
