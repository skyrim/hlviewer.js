import { Reader } from '../Reader'
import { paletteToRGBA, paletteWithLastTransToRGBA } from './Util'

function parseDecal(r: Reader): WadDecal {
  const name = r.nstr(16)

  const width = r.ui()
  const height = r.ui()

  r.skip(4 * 4) // skip mipmap offsets

  // read largest mipmap data
  const pixelCount = width * height
  const pixels = r.arrx(pixelCount, Reader.Type.UByte)

  // skip other 3 mipmaps
  r.skip(21 * (pixelCount / 64))

  r.skip(2) // skip padding bytes

  const palette = r.arrx(768, Reader.Type.UByte)

  const data =
    name[0] === '{'
      ? paletteWithLastTransToRGBA(pixels, palette)
      : paletteToRGBA(pixels, palette)

  return {
    type: 'decal',
    name,
    width,
    height,
    data
  }
}

function parseCache(_r: Reader, metadata: WadEntryMetadata): WadCache {
  return {
    type: 'cache',
    name: metadata.name
  }
}

function parseTexture(r: Reader): WadTexture {
  const name = r.nstr(16)

  const width = r.ui()
  const height = r.ui()

  r.skip(4 * 4) // skip mipmap offsets

  // read largest mipmap data
  const pixelCount = width * height
  const pixels = r.arrx(pixelCount, Reader.Type.UByte)

  // skip other 3 mipmaps
  r.skip(21 * (pixelCount / 64))

  r.skip(2) // skip padding bytes

  const palette = r.arrx(768, Reader.Type.UByte)

  const data =
    name[0] === '{'
      ? paletteWithLastTransToRGBA(pixels, palette)
      : paletteToRGBA(pixels, palette)

  return {
    type: 'texture',
    name,
    width,
    height,
    data
  }
}

function parseFont(r: Reader, metadata: WadEntryMetadata): WadFont {
  const width = r.ui()
  const height = r.ui()
  const rowCount = r.ui()
  const rowHeight = r.ui()

  const glyphs = []
  // hardcoded 256 number of glyphs
  for (let i = 0; i < 256; ++i) {
    glyphs.push({
      offset: r.us(),
      width: r.us()
    })
  }

  const pixelCount = width * height
  const pixels = r.arrx(pixelCount, Reader.Type.UByte)

  r.skip(2)

  const palette = r.arrx(256 * 3, Reader.Type.UByte)

  return {
    type: 'font',
    name: metadata.name,
    width,
    height,
    rowCount,
    rowHeight,
    glyphs,
    data: paletteToRGBA(pixels, palette)
  }
}

function parseUnknown(r: Reader, metadata: WadEntryMetadata): WadUnknown {
  return {
    type: 'unknown',
    name: metadata.name,
    data: r.arrx(metadata.length, r.ub.bind(r))
  }
}

function parseEntry(r: Reader, metadata: WadEntryMetadata): WadEntry {
  r.seek(metadata.offset)
  switch (metadata.type) {
    case 0x40: {
      return parseDecal(r)
    }
    case 0x42: {
      return parseCache(r, metadata)
    }
    case 0x43: {
      return parseTexture(r)
    }
    case 0x46: {
      return parseFont(r, metadata)
    }

    default: {
      // unknown data type; return array of bytes
      return parseUnknown(r, metadata)
    }
  }
}

export interface WadTexture {
  type: 'texture'
  name: string
  width: number
  height: number
  data: Uint8Array
}

export interface WadDecal {
  type: 'decal'
  name: string
  width: number
  height: number
  data: Uint8Array
}

export interface WadCache {
  type: 'cache'
  name: string
}

export interface WadFont {
  type: 'font'
  name: string
  width: number
  height: number
  rowCount: number
  rowHeight: number
  glyphs: {
    offset: number
    width: number
  }[]
  data: Uint8Array
}

export interface WadUnknown {
  type: 'unknown'
  name: string
  data: Uint8Array
}

export type WadEntry = WadTexture | WadDecal | WadCache | WadFont | WadUnknown

interface WadEntryMetadata {
  offset: number
  diskLength: number
  length: number
  type: number
  isCompressed: number
  name: string
}

export class Wad {
  entries: WadEntry[]

  constructor(entries: WadEntry[]) {
    this.entries = entries
  }

  static parse(buffer: ArrayBuffer) {
    const r = new Reader(buffer)

    const magic = r.nstr(4)
    if (magic !== 'WAD3') {
      throw new Error('Invalid WAD file format')
    }

    const entryCount = r.ui()
    const directoryOffset = r.ui()
    r.seek(directoryOffset)
    const entriesMetadata: WadEntryMetadata[] = []
    for (let i = 0; i < entryCount; ++i) {
      const entry: WadEntryMetadata = {
        offset: r.ui(),
        diskLength: r.ui(),
        length: r.ui(),
        type: r.b(),
        isCompressed: r.b(),
        name: ''
      }
      r.skip(2)
      entry.name = r.nstr(16)
      entriesMetadata.push(entry)
    }

    const entries: WadEntry[] = entriesMetadata.map(e => parseEntry(r, e))

    return new Wad(entries)
  }
}
