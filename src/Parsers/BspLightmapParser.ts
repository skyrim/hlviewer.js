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
  private root: BspLightmapNode

  private constructor(lightmap: Uint8Array) {
    this.lightmap = lightmap

    this.texture = new Uint8Array(
      BspLightmapParser.TEXTURE_SIZE * BspLightmapParser.TEXTURE_SIZE * 4
    )
    this.texture[this.texture.length - 4] = 255
    this.texture[this.texture.length - 3] = 255
    this.texture[this.texture.length - 2] = 255
    this.texture[this.texture.length - 1] = 255

    this.root = {
      children: [],
      isFilled: false,
      x: 0,
      y: 0,
      width: BspLightmapParser.TEXTURE_SIZE,
      height: BspLightmapParser.TEXTURE_SIZE
    }
  }

  getRoot() {
    return this.root
  }

  getTexture() {
    return this.texture
  }

  processFace(
    faceVerts: {
      pos: Float32Array
      uv: Float32Array
      luv: Float32Array
    }[],
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
    const size = this.getDimensions(faceVerts)
    const rect = this.readLightmap(offset, size.width, size.height)
    if (rect) {
      // Determine the correct TexCoords for the lightmap (I think this bit is bugged too)
      for (let i = 0; i < faceVerts.length; ++i) {
        const faceVert = faceVerts[i]
        let lu =
          faceVert.pos[0] * texinfo.s[0] +
          faceVert.pos[1] * texinfo.s[1] +
          faceVert.pos[2] * texinfo.s[2] +
          texinfo.sShift -
          size.minU
        lu += rect.x * 16 + 8
        lu /= BspLightmapParser.TEXTURE_SIZE * 16

        let lv =
          faceVert.pos[0] * texinfo.t[0] +
          faceVert.pos[1] * texinfo.t[1] +
          faceVert.pos[2] * texinfo.t[2] +
          texinfo.tShift -
          size.minV
        lv += rect.y * 16 + 8
        lv /= BspLightmapParser.TEXTURE_SIZE * 16

        faceVert.luv[0] = lu
        faceVert.luv[1] = lv
      }
    }
  }

  private getDimensions(
    verts: {
      pos: Float32Array
      uv: Float32Array
      luv: Float32Array
    }[]
  ) {
    // find the min and max UV's for a face
    let minU = Math.floor(verts[0].uv[0])
    let minV = Math.floor(verts[0].uv[1])
    let maxU = Math.floor(verts[0].uv[0])
    let maxV = Math.floor(verts[0].uv[1])

    for (let i = 1; i < verts.length; ++i) {
      const faceVert = verts[i]

      if (Math.floor(faceVert.uv[0]) < minU) {
        minU = Math.floor(faceVert.uv[0])
      }
      if (Math.floor(faceVert.uv[1]) < minV) {
        minV = Math.floor(faceVert.uv[1])
      }
      if (Math.floor(faceVert.uv[0]) > maxU) {
        maxU = Math.floor(faceVert.uv[0])
      }
      if (Math.floor(faceVert.uv[1]) > maxV) {
        maxV = Math.floor(faceVert.uv[1])
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
  ): BspLightmapNode | null {
    if (height <= 0 || width <= 0) {
      return null
    }

    const node = this.allocateLightmapRect(this.root, width, height)

    if (node) {
      const o = [node.x, node.y]
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

    return node
  }

  private allocateLightmapRect(
    node: BspLightmapNode,
    width: number,
    height: number
  ): BspLightmapNode | null {
    if (node.children.length) {
      const retNode = this.allocateLightmapRect(node.children[0], width, height)
      if (retNode) {
        return retNode
      }
      return this.allocateLightmapRect(node.children[1], width, height)
    }

    if (node.isFilled) {
      return null
    }

    // too small
    if (node.width < width || node.height < height) {
      return null
    }

    // perfect fit, allocate without splitting
    if (node.width == width && node.height == height) {
      node.isFilled = true
      return node
    }

    // we need to split if we've reached here
    let nodes

    // which way do we split?
    if (node.width - width > node.height - height) {
      nodes = [
        {
          children: [],
          isFilled: false,
          x: node.x,
          y: node.y,
          width: width,
          height: node.height
        },
        {
          children: [],
          isFilled: false,
          x: node.x + width,
          y: node.y,
          width: node.width - width,
          height: node.height
        }
      ]
    } else {
      nodes = [
        {
          children: [],
          isFilled: false,
          x: node.x,
          y: node.y,
          width: node.width,
          height: height
        },
        {
          children: [],
          isFilled: false,
          x: node.x,
          y: node.y + height,
          width: node.width,
          height: node.height - height
        }
      ]
    }
    node.children = nodes

    return this.allocateLightmapRect(node.children[0], width, height)
  }
}
