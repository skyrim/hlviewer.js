import { xhr } from './Xhr'
import { FetchFunction } from './FetchFunction'
import { ResourceType } from './ResourceType'
import { basename, extname, assertUnreachable } from '../Util'

const resolveUrl = (
  type: ResourceType,
  name: string,
  _wads: string[]
): string => {
  const extension = extname(name)
  const bname = basename(name, extension)

  switch (type) {
    case ResourceType.replay: {
      return `/res/replays/${bname}.dem`
    }
    case ResourceType.map: {
      return `/res/maps/${bname}.bsp`
    }
    case ResourceType.texture: {
      return `/res/textures/${bname}.png`
    }
    case ResourceType.font: {
      return `/res/fonts/${bname}.png`
    }
    case ResourceType.sound: {
      return `/res/sounds/${name}`
    }
    case ResourceType.sprite: {
      return `/res/sprites/${bname}.spr`
    }
    case ResourceType.model: {
      return `/res/models/${bname}.mdl`
    }
  }

  assertUnreachable(type)
}

export const defaultFetcher: FetchFunction = (type, name, wads) => {
  const url = resolveUrl(type, name, wads)
  return xhr(url, { isBinary: true })
}
