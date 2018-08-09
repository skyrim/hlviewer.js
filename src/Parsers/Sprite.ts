import { xhr, ProgressCallback } from '../Xhr'
import { Reader } from '../Reader'

interface SpriteHeader {
  version: number
  type: SpriteType
  alphaType: SpriteAlphaType
  radius: number
  width: number
  height: number
  frameCount: number
  beamLength: number
  syncType: SpriteSyncType
}

interface SpriteFrame {
  group: number
  position: number[]
  width: number
  height: number
  data: Uint8Array
}

enum SpriteType {
  VP_PARALLEL_UPRIGHT = 0,
  FACING_UPRIGHT = 1,
  VP_PARALLEL = 2,
  ORIENTED = 3,
  VP_PARALLEL_ORIENTED = 4
}

enum SpriteAlphaType {
  SPR_NORMAL = 0,
  SPR_ADDITIVE = 1,
  SPR_INDEXALPHA = 2,
  SPR_ALPHTEST = 3
}

enum SpriteSyncType {
  SYNCHRONIZED = 0,
  RANDOM = 1
}

export class Sprite {
  header: SpriteHeader
  frames: SpriteFrame[]

  constructor(header: SpriteHeader, frames: SpriteFrame[]) {
    this.header = header
    this.frames = frames
  }

  static parseFromArrayBuffer(buffer: ArrayBuffer) {
    const r = new Reader(buffer)

    const magic = r.nstr(4)
    if (magic !== 'IDSP') {
      throw new Error('Invalid sprite file format')
    }

    const header: SpriteHeader = {
      version: r.i(), // must be 2 (1 = Quake, 2 = Half-Life)
      type: r.i(),
      alphaType: r.i(),
      radius: r.f(),
      width: r.i(),
      height: r.i(),
      frameCount: r.i(),
      beamLength: r.f(),
      syncType: r.i()
    }

    const paletteSize = r.s()
    const palette = r.arr(paletteSize * 3, r.ub.bind(r))

    const frames: SpriteFrame[] = []
    for (let i = 0; i < header.frameCount; ++i) {
      const frame = {
        group: r.i(),
        position: [r.i(), r.i()],
        width: r.i(),
        height: r.i(),
        data: new Uint8Array(header.width * header.height * 4)
      }

      const pixels = r.arr(header.width * header.height, r.ub.bind(r))

      if (header.alphaType === SpriteAlphaType.SPR_ALPHTEST) {
        const alphaR = palette[palette.length - 3]
        const alphaG = palette[palette.length - 2]
        const alphaB = palette[palette.length - 1]

        for (let j = 0; j < pixels.length; ++j) {
          const r = palette[pixels[j] * 3]
          const g = palette[pixels[j] * 3 + 1]
          const b = palette[pixels[j] * 3 + 2]
          const a = (r === alphaR && g === alphaG && b === alphaB) ? 0 : 255

          frame.data[4 * j] = r
          frame.data[4 * j + 1] = g
          frame.data[4 * j + 2] = b
          frame.data[4 * j + 3] = a
        }
      } else {
        for (let j = 0; j < pixels.length; ++j) {
          const r = palette[pixels[j] * 3]
          const g = palette[pixels[j] * 3 + 1]
          const b = palette[pixels[j] * 3 + 2]
          const a = 255

          frame.data[4 * j] = r
          frame.data[4 * j + 1] = g
          frame.data[4 * j + 2] = b
          frame.data[4 * j + 3] = a
        }
      }

      frames.push(frame)
    }

    return new Sprite(header, frames)
  }

  static async loadFromUrl(url: string, progressCallback: ProgressCallback) {
    const buffer = await xhr(url, {
      method: 'GET',
      isBinary: true,
      progressCallback
    })

    const sprite = Sprite.parseFromArrayBuffer(buffer)

    return sprite
  }
}

