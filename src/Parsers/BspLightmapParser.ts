export interface BspLightmapNode {
  children: BspLightmapNode[]
  isFilled: boolean
  x: number
  y: number
  width: number
  height: number
}

export class BspLightmapParser {
  static TEXTURE_SIZE = 1024

  static init(lightmap: Uint8Array) {
    return new BspLightmapParser(lightmap)
  }

  private lightmap: Uint8Array // entire lightmap of the bsp map
  private texture: Uint8Array
  private block = new Uint16Array(BspLightmapParser.TEXTURE_SIZE)

  private constructor(lightmap: Uint8Array) {
    this.lightmap = lightmap

    this.texture = new Uint8Array(
      BspLightmapParser.TEXTURE_SIZE * BspLightmapParser.TEXTURE_SIZE * 4
    )
    this.texture[this.texture.length - 4] = 255
    this.texture[this.texture.length - 3] = 255
    this.texture[this.texture.length - 2] = 255
    this.texture[this.texture.length - 1] = 255
  }

  getTexture() {
    return this.texture
  }

  processFace(
    faceData: Float32Array,
    texinfo: {
      // TODO: MapTexInfo interface
      s: number[]
      sShift: number
      t: number[]
      tShift: number
      textureIndex: number
      flags: number
    },
    offset: number
  ) {
    const size = this.getDimensions(faceData)
    const rect = this.readLightmap(offset, size.width, size.height)
    if (rect) {
      // Determine the correct TexCoords for the lightmap (I think this bit is bugged too)
      for (let i = 0; i < faceData.length / 7; ++i) {
        let lu =
          faceData[i * 7] * texinfo.s[0] +
          faceData[i * 7 + 1] * texinfo.s[1] +
          faceData[i * 7 + 2] * texinfo.s[2] +
          texinfo.sShift -
          size.minU
        lu += rect.x * 16 + 8
        lu /= BspLightmapParser.TEXTURE_SIZE * 16

        let lv =
          faceData[i * 7] * texinfo.t[0] +
          faceData[i * 7 + 1] * texinfo.t[1] +
          faceData[i * 7 + 2] * texinfo.t[2] +
          texinfo.tShift -
          size.minV
        lv += rect.y * 16 + 8
        lv /= BspLightmapParser.TEXTURE_SIZE * 16

        faceData[i * 7 + 5] = lu
        faceData[i * 7 + 6] = lv
      }
    }
  }

  private getDimensions(faceData: Float32Array) {
    // find the min and max UV's for a face
    let minU = Math.floor(faceData[3])
    let minV = Math.floor(faceData[4])
    let maxU = Math.floor(faceData[3])
    let maxV = Math.floor(faceData[4])

    for (let i = 1; i < faceData.length / 7; ++i) {
      if (Math.floor(faceData[i * 7 + 3]) < minU) {
        minU = Math.floor(faceData[i * 7 + 3])
      }
      if (Math.floor(faceData[i * 7 + 4]) < minV) {
        minV = Math.floor(faceData[i * 7 + 4])
      }
      if (Math.floor(faceData[i * 7 + 3]) > maxU) {
        maxU = Math.floor(faceData[i * 7 + 3])
      }
      if (Math.floor(faceData[i * 7 + 4]) > maxV) {
        maxV = Math.floor(faceData[i * 7 + 4])
      }
    }

    // calculate the lightmap dimensions
    return {
      width: Math.ceil(maxU / 16) - Math.floor(minU / 16) + 1,
      height: Math.ceil(maxV / 16) - Math.floor(minV / 16) + 1,
      minU: Math.floor(minU),
      minV: Math.floor(minV)
    }
  }

  private readLightmap(
    offset: number,
    width: number,
    height: number
  ): {x: number, y: number} | null {
    if (height <= 0 || width <= 0) {
      return null
    }

    const block = this.findFreeSpace(width, height)

    if (block) {
      const o = [block.x, block.y]
      const s = [width, height]
      const d = [BspLightmapParser.TEXTURE_SIZE, BspLightmapParser.TEXTURE_SIZE]
      const count = width * height
      for (let i = 0; i < count; ++i) {
        const p = o[1] * d[0] + o[0] + d[0] * Math.floor(i / s[0]) + (i % s[0])
        this.texture[p * 4] = Math.min(255, this.lightmap[offset + i * 3] * 2)
        this.texture[p * 4 + 1] = Math.min(
          255,
          this.lightmap[offset + i * 3 + 1] * 2
        )
        this.texture[p * 4 + 2] = Math.min(
          255,
          this.lightmap[offset + i * 3 + 2] * 2
        )
        this.texture[p * 4 + 3] = 255
      }
    }

    return block
  }

  private findFreeSpace(w: number, h: number): { x: number; y: number } | null {
    let x = 0
    let y = 0

    let bestHeight = BspLightmapParser.TEXTURE_SIZE
    for (let i = 0; i < this.block.length - w; ++i) {
      let tentativeHeight = 0

      let j
      for (j = 0; j < w; ++j) {
        if (this.block[i + j] >= bestHeight) {
          break
        }
        if (this.block[i + j] > tentativeHeight) {
          tentativeHeight = this.block[i + j]
        }
      }

      if (j === w) {
        x = i
        y = bestHeight = tentativeHeight
      }
    }

    if (bestHeight + h > BspLightmapParser.TEXTURE_SIZE) {
      return null
    }

    for (let i = 0; i < w; ++i) {
      this.block[x + i] = bestHeight + h
    }

    return { x, y }
  }
}
