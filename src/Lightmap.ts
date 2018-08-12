export interface LightmapNode {
  children: LightmapNode[]
  isFilled: boolean
  x: number
  y: number
  width: number
  height: number
}

export class MapLightmap {
  static init(lightmap: Uint8Array) {
    return new MapLightmap(lightmap)
  }

  private lightmap: Uint8Array // entire lightmap of the bsp map
  private texture: Uint8Array
  private root: LightmapNode

  private constructor(lightmap: Uint8Array) {
    this.lightmap = lightmap

    this.texture = new Uint8Array(512 * 512 * 4)
    this.texture[this.texture.length - 4] = 255
    this.texture[this.texture.length - 3] = 255
    this.texture[this.texture.length - 2] = 255
    this.texture[this.texture.length - 1] = 255

    this.root = {
      children: [],
      isFilled: false,
      x: 0,
      y: 0,
      width: 512,
      height: 512
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
      pos: number[]
      uv: number[]
      luv: number[]
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
        lu /= 512 * 16 // 512 = lightmap size

        let lv =
          faceVert.pos[0] * texinfo.t[0] +
          faceVert.pos[1] * texinfo.t[1] +
          faceVert.pos[2] * texinfo.t[2] +
          texinfo.tShift -
          size.minV
        lv += rect.y * 16 + 8
        lv /= 512 * 16 // 512 = ligthmap size

        faceVert.luv = [lu, lv]
      }
    }
  }

  private getDimensions(
    verts: {
      pos: number[]
      uv: number[]
      luv: number[]
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
  ): LightmapNode | null {
    if (height <= 0 || width <= 0) {
      return null
    }

    // navigate lightmap BSP to find correctly sized space
    const node = this.allocateLightmapRect(this.root, width, height)

    if (node) {
      const pixelCount = width * height
      for (let i = 0; i < pixelCount; ++i) {
        // 512 = total lightmap height
        const px = (i % width) + node.x
        const py = Math.floor(i / height) + node.y
        const pos = py * 512 + px
        this.texture[pos + i * 4] = this.lightmap[offset + i * 3]
        this.texture[pos + i * 4 + 1] = this.lightmap[offset + i * 3 + 1]
        this.texture[pos + i * 4 + 2] = this.lightmap[offset + i * 3 + 2]
        this.texture[pos + i * 4 + 3] = 255
      }
    }

    return node
  }

  private allocateLightmapRect(
    node: LightmapNode,
    width: number,
    height: number
  ): LightmapNode | null {
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
