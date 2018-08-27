import { Reader, ReaderDataType } from '../Reader'
import { paletteWithLastTransToRGBA, paletteToRGBA } from './Util'

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

export enum SpriteType {
  VP_PARALLEL_UPRIGHT = 0,
  FACING_UPRIGHT = 1,
  VP_PARALLEL = 2,
  ORIENTED = 3,
  VP_PARALLEL_ORIENTED = 4
}

export enum SpriteAlphaType {
  SPR_NORMAL = 0,
  SPR_ADDITIVE = 1,
  SPR_INDEXALPHA = 2,
  SPR_ALPHTEST = 3
}

export enum SpriteSyncType {
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

  static parse(buffer: ArrayBuffer) {
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
    const palette = r.arrx(paletteSize * 3, ReaderDataType.UByte)

    const frames: SpriteFrame[] = []
    for (let i = 0; i < header.frameCount; ++i) {
      const frame = {
        group: r.i(),
        position: [r.i(), r.i()],
        width: r.i(),
        height: r.i(),
        data: new Uint8Array(header.width * header.height * 4)
      }

      const pixels = r.arrx(header.width * header.height, ReaderDataType.UByte)

      if (header.alphaType === SpriteAlphaType.SPR_ALPHTEST) {
        frame.data = paletteWithLastTransToRGBA(pixels, palette)
      } else {
        frame.data = paletteToRGBA(pixels, palette)
      }

      frames.push(frame)
    }

    return new Sprite(header, frames)
  }
}
