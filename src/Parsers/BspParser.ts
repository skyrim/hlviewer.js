import { basename } from '../Util'
import { vdf } from '../Parsers/Vdf'
import { BspTexture, Bsp } from '../Bsp'
import { Reader, ReaderDataType } from '../Reader'
import { BspLightmapParser } from '../Parsers/BspLightmapParser'
import { paletteWithLastTransToRGBA, paletteToRGBA } from './Util'

export function parseModels(
  models: BspLumpModel[],
  faces: BspLumpFace[],
  edges: BspLumpEdge[],
  surfEdges: BspLumpSurfedge[],
  vertices: BspLumpVertex[],
  texinfo: BspLumpTexInfo[],
  textures: BspTexture[],
  lightmap: BspLightmapParser
) {
  const parsedModels = []

  for (let i = 0; i < models.length; ++i) {
    const model = models[i]

    const _faces: {
      buffer: Float32Array
      textureIndex: number
    }[] = []

    const v0 = new Float32Array(3)
    const v1 = new Float32Array(3)
    const v2 = new Float32Array(3)
    const uv0 = new Float32Array(2)
    const uv1 = new Float32Array(2)
    const uv2 = new Float32Array(2)
    const luv0 = new Float32Array(2)
    const luv1 = new Float32Array(2)
    const luv2 = new Float32Array(2)

    let origin =
      i === 0
        ? [0, 0, 0]
        : [0, 0, 0].map(
            (_, i) => (model.maxs[i] - model.mins[i]) / 2 + model.mins[i]
          )

    for (let i = model.firstFace; i < model.firstFace + model.faceCount; ++i) {
      const faceData = {
        // 3 floats vertices | 2 floats uvs | 2 floats luvs
        buffer: new Float32Array((faces[i].edgeCount - 2) * 21),
        textureIndex: -1
      }

      const faceTexInfo = texinfo[faces[i].textureInfo]
      const faceTexture = textures[faceTexInfo.textureIndex]
      const faceSurfEdges = surfEdges.slice(
        faces[i].firstEdge,
        faces[i].firstEdge + faces[i].edgeCount
      )

      const v0idx =
        edges[Math.abs(faceSurfEdges[0])][faceSurfEdges[0] > 0 ? 0 : 1]
      v0[0] = vertices[v0idx][0]
      v0[1] = vertices[v0idx][1]
      v0[2] = vertices[v0idx][2]

      uv0[0] =
        v0[0] * faceTexInfo.s[0] +
        v0[1] * faceTexInfo.s[1] +
        v0[2] * faceTexInfo.s[2] +
        faceTexInfo.sShift
      uv0[1] =
        v0[0] * faceTexInfo.t[0] +
        v0[1] * faceTexInfo.t[1] +
        v0[2] * faceTexInfo.t[2] +
        faceTexInfo.tShift

      luv0[0] = 0
      luv0[1] = 0

      const v1idx =
        edges[Math.abs(faceSurfEdges[1])][faceSurfEdges[1] > 0 ? 0 : 1]
      v1[0] = vertices[v1idx][0]
      v1[1] = vertices[v1idx][1]
      v1[2] = vertices[v1idx][2]

      uv1[0] =
        v1[0] * faceTexInfo.s[0] +
        v1[1] * faceTexInfo.s[1] +
        v1[2] * faceTexInfo.s[2] +
        faceTexInfo.sShift
      uv1[1] =
        v1[0] * faceTexInfo.t[0] +
        v1[1] * faceTexInfo.t[1] +
        v1[2] * faceTexInfo.t[2] +
        faceTexInfo.tShift
      luv1[0] = 0
      luv1[1] = 0.999

      let compIndex = 0
      for (let j = 2; j < faces[i].edgeCount; ++j) {
        const v2idx =
          edges[Math.abs(faceSurfEdges[j])][faceSurfEdges[j] > 0 ? 0 : 1]
        v2[0] = vertices[v2idx][0]
        v2[1] = vertices[v2idx][1]
        v2[2] = vertices[v2idx][2]
        uv2[0] =
          v2[0] * faceTexInfo.s[0] +
          v2[1] * faceTexInfo.s[1] +
          v2[2] * faceTexInfo.s[2] +
          faceTexInfo.sShift
        uv2[1] =
          v2[0] * faceTexInfo.t[0] +
          v2[1] * faceTexInfo.t[1] +
          v2[2] * faceTexInfo.t[2] +
          faceTexInfo.tShift
        luv2[0] = 0.999
        luv2[1] = 0.999

        // vert1: coord, uv and luv
        faceData.buffer[compIndex++] = v0[0]
        faceData.buffer[compIndex++] = v0[1]
        faceData.buffer[compIndex++] = v0[2]
        faceData.buffer[compIndex++] = uv0[0]
        faceData.buffer[compIndex++] = uv0[1]
        faceData.buffer[compIndex++] = luv0[0]
        faceData.buffer[compIndex++] = luv0[1]

        // vert2
        faceData.buffer[compIndex++] = v1[0]
        faceData.buffer[compIndex++] = v1[1]
        faceData.buffer[compIndex++] = v1[2]
        faceData.buffer[compIndex++] = uv1[0]
        faceData.buffer[compIndex++] = uv1[1]
        faceData.buffer[compIndex++] = luv1[0]
        faceData.buffer[compIndex++] = luv1[1]

        // vert2
        faceData.buffer[compIndex++] = v2[0]
        faceData.buffer[compIndex++] = v2[1]
        faceData.buffer[compIndex++] = v2[2]
        faceData.buffer[compIndex++] = uv2[0]
        faceData.buffer[compIndex++] = uv2[1]
        faceData.buffer[compIndex++] = luv2[0]
        faceData.buffer[compIndex++] = luv2[1]

        v1[0] = v2[0]
        v1[1] = v2[1]
        v1[2] = v2[2]
        uv1[0] = uv2[0]
        uv1[1] = uv2[1]
        luv1[0] = luv2[0]
        luv1[1] = luv2[1]
      }

      // face has a lightmap if flag is equal to 0
      if (faceTexInfo.flags === 0 || faceTexInfo.flags === -65536) {
        lightmap.processFace(
          faceData.buffer,
          faceTexInfo,
          faces[i].lightmapOffset
        )
      }

      faceData.textureIndex = faceTexInfo.textureIndex

      for (let j = 0; j < faceData.buffer.length / 7; ++j) {
        faceData.buffer[j * 7] -= origin[0]
        faceData.buffer[j * 7 + 1] -= origin[1]
        faceData.buffer[j * 7 + 2] -= origin[2]
        faceData.buffer[j * 7 + 3] /= faceTexture.width
        faceData.buffer[j * 7 + 4] /= faceTexture.height
      }

      _faces.push(faceData)
    }

    parsedModels.push({
      origin,
      faces: _faces
    })
  }

  return parsedModels
}

export enum BspLumpIndex {
  Entities = 0,
  Planes = 1,
  Textures = 2,
  Vertices = 3,
  Visibility = 4,
  Nodes = 5,
  TexInfo = 6,
  Faces = 7,
  Lighting = 8,
  ClipNodes = 9,
  Leaves = 10,
  MarkSurfaces = 11,
  Edges = 12,
  SurfEdges = 13,
  Models = 14
}

export interface BspLump {
  offset: number
  length: number
}

export interface BspLumpFace {
  plane: number
  planeSide: number
  firstEdge: number
  edgeCount: number
  textureInfo: number
  styles: number[]
  lightmapOffset: number
}

export interface BspLumpModel {
  mins: number[]
  maxs: number[]
  origin: number[]
  headNodes: number[]
  visLeaves: number
  firstFace: number
  faceCount: number
}

export type BspLumpEdge = number[]

export type BspLumpSurfedge = number

export type BspLumpVertex = number[]

export interface BspLumpTexInfo {
  s: number[]
  sShift: number
  t: number[]
  tShift: number
  textureIndex: number
  flags: number
}

export type BspLumpLightmap = Uint8Array

export class BspParser {
  static parse(name: string, buffer: ArrayBuffer): Bsp {
    const r = new Reader(buffer)
    const version = r.ui()
    if (version !== 30) {
      throw new Error('Invalid map version')
    }

    const lumps: BspLump[] = []
    for (let i = 0; i < 15; ++i) {
      lumps.push({
        offset: r.ui(),
        length: r.ui()
      })
    }

    const entities = this.loadEntities(
      r,
      lumps[BspLumpIndex.Entities].offset,
      lumps[BspLumpIndex.Entities].length
    )

    const textures = this.loadTextures(r, lumps[BspLumpIndex.Textures].offset)

    const models = this.loadModels(
      r,
      lumps[BspLumpIndex.Models].offset,
      lumps[BspLumpIndex.Models].length
    )

    const faces = this.loadFaces(
      r,
      lumps[BspLumpIndex.Faces].offset,
      lumps[BspLumpIndex.Faces].length
    )

    const edges = this.loadEdges(
      r,
      lumps[BspLumpIndex.Edges].offset,
      lumps[BspLumpIndex.Edges].length
    )

    const surfEdges = this.loadSurfEdges(
      r,
      lumps[BspLumpIndex.SurfEdges].offset,
      lumps[BspLumpIndex.SurfEdges].length
    )

    const vertices = this.loadVertices(
      r,
      lumps[BspLumpIndex.Vertices].offset,
      lumps[BspLumpIndex.Vertices].length
    )

    const texinfo = this.loadTexInfo(
      r,
      lumps[BspLumpIndex.TexInfo].offset,
      lumps[BspLumpIndex.TexInfo].length
    )

    const lightmap = this.loadLightmap(
      r,
      lumps[BspLumpIndex.Lighting].offset,
      lumps[BspLumpIndex.Lighting].length
    )

    const parsedLightmap = BspLightmapParser.init(lightmap)

    const parsedModels = parseModels(
      models,
      faces,
      edges,
      surfEdges,
      vertices,
      texinfo,
      textures,
      parsedLightmap
    )

    return new Bsp(name, entities, textures, parsedModels, {
      width: BspLightmapParser.TEXTURE_SIZE,
      height: BspLightmapParser.TEXTURE_SIZE,
      data: parsedLightmap.getTexture()
    })
  }

  private static loadFaces(
    r: Reader,
    offset: number,
    length: number
  ): BspLumpFace[] {
    r.seek(offset)

    const faces = []
    for (let i = 0; i < length / 20; ++i) {
      faces.push({
        plane: r.us(),
        planeSide: r.us(),
        firstEdge: r.ui(),
        edgeCount: r.us(),
        textureInfo: r.us(),
        styles: [r.ub(), r.ub(), r.ub(), r.ub()],
        lightmapOffset: r.ui()
      })
    }
    return faces
  }

  private static loadModels(
    r: Reader,
    offset: number,
    length: number
  ): BspLumpModel[] {
    r.seek(offset)

    const models = []
    for (let i = 0; i < length / 64; ++i) {
      models.push({
        mins: [r.f(), r.f(), r.f()],
        maxs: [r.f(), r.f(), r.f()],
        origin: [r.f(), r.f(), r.f()],
        headNodes: [r.i(), r.i(), r.i(), r.i()],
        visLeaves: r.i(),
        firstFace: r.i(),
        faceCount: r.i()
      })
    }
    return models
  }

  private static loadEdges(
    r: Reader,
    offset: number,
    length: number
  ): BspLumpEdge[] {
    r.seek(offset)

    const edges = []
    for (let i = 0; i < length / 4; ++i) {
      edges.push([r.us(), r.us()])
    }
    return edges
  }

  private static loadSurfEdges(
    r: Reader,
    offset: number,
    length: number
  ): BspLumpSurfedge[] {
    r.seek(offset)

    const surfEdges = []
    for (let i = 0; i < length / 4; ++i) {
      surfEdges.push(r.i())
    }
    return surfEdges
  }

  private static loadVertices(
    r: Reader,
    offset: number,
    length: number
  ): BspLumpVertex[] {
    r.seek(offset)

    const vertices = []
    for (let i = 0; i < length / 12; ++i) {
      vertices.push([r.f(), r.f(), r.f()])
    }
    return vertices
  }

  private static loadTexInfo(
    r: Reader,
    offset: number,
    length: number
  ): BspLumpTexInfo[] {
    r.seek(offset)

    const texinfo: BspLumpTexInfo[] = []
    for (let i = 0; i < length / 40; ++i) {
      texinfo.push({
        s: [r.f(), r.f(), r.f()],
        sShift: r.f(),
        t: [r.f(), r.f(), r.f()],
        tShift: r.f(),
        textureIndex: r.i(),
        flags: r.i()
      })
    }
    return texinfo
  }

  private static loadLightmap(
    r: Reader,
    offset: number,
    length: number
  ): BspLumpLightmap {
    r.seek(offset)
    return r.arrx(length, ReaderDataType.UByte)
  }

  private static loadTextureData(r: Reader) {
    const name = r.nstr(16)
    const width = r.ui()
    const height = r.ui()

    const isExternal = !r.ui() // if mipmap offset == 0
    if (isExternal) {
      const data = new Uint8Array(4)
      data[0] = data[1] = data[2] = data[3] = 255

      return { name, width, height, data, isExternal }
    } else {
      r.skip(3 * 4) // skip mipmap offsets

      // read largest mipmap data
      const pixelCount = width * height
      const pixels = r.arrx(pixelCount, ReaderDataType.UByte)

      // skip other 3 mipmaps
      r.skip(21 * (pixelCount / 64))

      r.skip(2) // skip padding bytes

      const palette = r.arrx(768, ReaderDataType.UByte)

      const data =
        name[0] === '{'
          ? paletteWithLastTransToRGBA(pixels, palette)
          : paletteToRGBA(pixels, palette)

      return { name, width, height, data, isExternal }
    }
  }

  private static loadTextures(r: Reader, offset: number) {
    r.seek(offset)

    const count = r.ui()
    const offsets = []
    for (let i = 0; i < count; ++i) {
      offsets.push(r.ui())
    }

    const textures: BspTexture[] = []
    for (let i = 0; i < count; ++i) {
      if (offsets[i] === 0xffffffff) {
        textures.push({
          name: 'ERROR404',
          width: 1,
          height: 1,
          data: new Uint8Array([0, 255, 0, 255]),
          isExternal: false
        })
      } else {
        r.seek(offset + offsets[i])
        textures.push(this.loadTextureData(r))
      }
    }

    return textures
  }

  private static loadEntities(r: Reader, offset: number, length: number) {
    r.seek(offset)
    const entities: any[] = vdf(r.nstr(length)) as any

    const VECTOR_ATTRS = [
      'origin',
      'angles',
      '_diffuse_light',
      '_light',
      'rendercolor',
      'avelocity'
    ]
    const NUMBER_ATTRS = ['renderamt', 'rendermode', 'scale']

    const worldSpawn = entities[0]
    if (worldSpawn.classname === 'worldspawn') {
      worldSpawn.model = '*0'
      worldSpawn.wad = worldSpawn.wad || ''
      worldSpawn.wad = worldSpawn.wad
        .split(';')
        .filter((w: string) => w.length)
        .map((w: string) => w.replace(/\\/g, '/'))
        .map((w: string) => basename(w))
    }

    entities.forEach(e => {
      if (e.model) {
        if (typeof e.renderamt === 'undefined') {
          e.renderamt = 0
        }

        if (typeof e.rendermode === 'undefined') {
          e.rendermode = 0
        }

        if (typeof e.renderfx === 'undefined') {
          e.renderfx = 0
        }

        if (typeof e.rendercolor === 'undefined') {
          e.rendercolor = '0 0 0'
        }
      }

      VECTOR_ATTRS.forEach(attr => {
        if (e[attr]) {
          e[attr] = e[attr].split(' ').map((v: string) => Number.parseFloat(v))
        }
      })

      NUMBER_ATTRS.forEach(attr => {
        if (e[attr]) {
          e[attr] = Number.parseFloat(e[attr])
        }
      })
    })

    return entities
  }
}
