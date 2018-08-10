import { Reader } from '../Reader'
import { ProgressCallback, xhr } from '../Xhr'

function parseMipMaps(r: Reader, width: number, height: number) {
  const pixelCount = width * height
  const mipmaps = [0, 0, 0, 0].map((_1, i) =>
    r.arrx(pixelCount / Math.pow(1 << i, 2), Reader.Type.UByte)
  )

  r.skip(2)

  const palette = r.arrx(256 * 3, Reader.Type.UByte)

  return mipmaps.map(m => {
    const pixels = new Uint8Array(m.length * 4)

    for (let i = 0; i < m.length; ++i) {
      const r = palette[m[i] * 3]
      const g = palette[m[i] * 3 + 1]
      const b = palette[m[i] * 3 + 2]

      if (r === 0 && g === 0 && b === 255) {
        pixels[4 * i] = 0
        pixels[4 * i + 1] = 0
        pixels[4 * i + 2] = 0
        pixels[4 * i + 3] = 0
      } else {
        pixels[4 * i] = r
        pixels[4 * i + 1] = g
        pixels[4 * i + 2] = b
        pixels[4 * i + 3] = 255
      }
    }

    return pixels
  })
}

function parseTexture(r: Reader) {
  const baseOffset = r.tell()

  r.skip(16) // name
  const texture: any = {
    width: r.ui(),
    height: r.ui(),
    mipmaps: []
  }

  const mipmapOffset = r.ui()
  r.seek(baseOffset + mipmapOffset)
  texture.mipmaps = parseMipMaps(r, texture.width, texture.height)

  return { texture }
}

function parseEntry(r: Reader, entry: any) {
  r.seek(entry.offset)
  switch (entry.type) {
    case 67: {
      return parseTexture(r)
    }

    default: {
      // unknown data type; return array of bytes
      return r.arr(entry.length, r.ub.bind(r))
    }
  }
}

interface WadEntry {
  name: string
  data: {
    texture: {
      width: number
      height: number
      mipmaps: Uint8Array[]
    }
  }
}

class Wad {
  entries: WadEntry[]

  constructor(entries: any[]) {
    this.entries = entries
  }

  static parseFromArrayBuffer(buffer: ArrayBuffer) {
    const r = new Reader(buffer)

    const magic = r.nstr(4)
    if (magic !== 'WAD3') {
      throw new Error('Invalid WAD file format')
    }

    const entryCount = r.ui()
    const directoryOffset = r.ui()
    r.seek(directoryOffset)
    const entries = []
    for (let i = 0; i < entryCount; ++i) {
      const entry: any = {
        offset: r.ui(),
        diskLength: r.ui(),
        length: r.ui(),
        type: r.b(),
        isCompressed: r.b()
      }
      r.skip(2)
      entry.name = r.nstr(16)
      entries.push(entry)
    }

    entries.forEach(e => {
      e.data = parseEntry(r, e)
    })

    return new Wad(
      entries.map(e => ({
        name: e.name,
        data: e.data
      }))
    )
  }

  static loadFromUrl(url: string, progressCallback: ProgressCallback) {
    return xhr(url, {
      method: 'GET',
      isBinary: true,
      progressCallback
    }).then(response => Wad.parseFromArrayBuffer(response))
  }
}

export { Wad }
