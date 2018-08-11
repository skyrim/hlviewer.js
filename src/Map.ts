import * as Path from 'path'
import { Reader } from './Reader'
import { vdf } from './Vdf'
import { ProgressCallback, xhr } from './Xhr'
import { Sprite } from './Parsers/Sprite'
import { Tga } from './Parsers/Tga';
import { paletteWithLastTransToRGBA, paletteToRGBA } from './Parsers/Util';

function parseEntities(r: Reader, lumps: any[]) {
  r.seek(lumps[Map.Lump.Entities].offset)
  const entities = vdf(r.nstr(lumps[Map.Lump.Entities].length))

  const VECTOR_ATTRS = [
    'origin',
    'angles',
    '_diffuse_light',
    '_light',
    'rendercolor',
    'avelocity'
  ]
  const NUMBER_ATTRS = ['renderamt', 'rendermode']

  const worldSpawn = entities[0]
  if (worldSpawn.wad) {
    worldSpawn.wad = worldSpawn.wad
      .split(';')
      .filter((w: string) => w.length)
      .map((w: string) => w.replace(/\\/g, '/'))
      .map((w: string) => Path.basename(w))
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
        e.rendercolor = '0, 0, 0'
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

interface MapModel {
  vertices: number[][]
  faces: number[][]
  uv: number[][][]
  textureIndices: number[]
}

interface MapTexture {
  name: string
  width: number
  height: number
  data: Uint8Array
}

class Map {
  name: string
  entities: any[]
  textures: MapTexture[]
  models: MapModel[]
  skies: Tga[]
  sprites: { [name: string]: Sprite } = {}

  constructor(
    entities: any[],
    textures: MapTexture[],
    models: MapModel[],
    skies = []
  ) {
    this.entities = entities
    this.textures = textures
    this.models = models
    this.skies = skies
  }

  // TODO: refactor everything related to this
  hasMissingTextures() {
    for (let i = 0; i < this.textures.length; ++i) {
      const texture = this.textures[i]
      if (texture.data.length !== texture.width * texture.height) {
        return true
      }
    }

    return false
  }

  static parseFromArrayBuffer(buffer: ArrayBuffer) {
    const r = new Reader(buffer)
    const version = r.ui()
    if (version !== 30) {
      throw new Error('Invalid map version')
    }

    const lumps: any[] = []
    for (let i = 0; i < 15; ++i) {
      lumps.push({
        offset: r.ui(),
        length: r.ui()
      })
    }

    const parseTextures = (r: Reader) => {
      const parseTexture = (r: Reader) => {
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
          name,
          width,
          height,
          data
        }
      }

      r.seek(lumps[Map.Lump.Textures].offset)

      const count = r.ui()
      const offsets = []
      for (let i = 0; i < count; ++i) {
        offsets.push(r.ui())
      }

      const textures: MapTexture[] = []
      for (let i = 0; i < count; ++i) {
        if (offsets[i] === 0xffffffff) {
          textures.push({
            name: 'ERROR404',
            width: 1,
            height: 1,
            data: new Uint8Array([0, 255, 0, 255])
          })
        } else {
          r.seek(lumps[Map.Lump.Textures].offset + offsets[i])
          textures.push(parseTexture(r))
        }
      }

      return textures
    }

    const loadModels = (r: Reader, offset: number, length: number) => {
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

    const loadFaces = (r: Reader, offset: number, length: number) => {
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

    const loadEdges = (r: Reader, offset: number, length: number) => {
      r.seek(offset)

      const edges = []
      for (let i = 0; i < length / 4; ++i) {
        edges.push([r.us(), r.us()])
      }
      return edges
    }

    const loadSurfEdges = (r: Reader, offset: number, length: number) => {
      r.seek(offset)

      const surfEdges = []
      for (let i = 0; i < length / 4; ++i) {
        surfEdges.push(r.i())
      }
      return surfEdges
    }

    const loadVertices = (r: Reader, offset: number, length: number) => {
      r.seek(offset)

      const vertices = []
      for (let i = 0; i < length / 12; ++i) {
        vertices.push([r.f(), r.f(), r.f()])
      }
      return vertices
    }

    const loadTexInfo = (r: Reader, offset: number, length: number) => {
      r.seek(offset)

      const texinfo = []
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

    const entities = parseEntities(r, lumps)
    const textures = parseTextures(r)

    const models = loadModels(
      r,
      lumps[Map.Lump.Models].offset,
      lumps[Map.Lump.Models].length
    )

    const faces = loadFaces(
      r,
      lumps[Map.Lump.Faces].offset,
      lumps[Map.Lump.Faces].length
    )

    const edges = loadEdges(
      r,
      lumps[Map.Lump.Edges].offset,
      lumps[Map.Lump.Edges].length
    )

    const surfEdges = loadSurfEdges(
      r,
      lumps[Map.Lump.SurfEdges].offset,
      lumps[Map.Lump.SurfEdges].length
    )

    const vertices = loadVertices(
      r,
      lumps[Map.Lump.Vertices].offset,
      lumps[Map.Lump.Vertices].length
    )

    const texinfo = loadTexInfo(
      r,
      lumps[Map.Lump.TexInfo].offset,
      lumps[Map.Lump.TexInfo].length
    )

    const parsedModels = ((
      models,
      faces,
      edges,
      surfEdges,
      vertices,
      texinfo,
      textures
    ) =>
      models.map(model => {
        const modelVertices = []
        const modelUVs = []
        const modelTextureIndices = []
        const modelFaces = []

        for (
          let i = model.firstFace;
          i < model.firstFace + model.faceCount;
          ++i
        ) {
          const faceTexInfo = texinfo[faces[i].textureInfo]
          const faceTexture = textures[faceTexInfo.textureIndex]
          const faceSurfEdges = surfEdges.slice(
            faces[i].firstEdge,
            faces[i].firstEdge + faces[i].edgeCount
          )

          const v1 =
            vertices[
              edges[Math.abs(faceSurfEdges[0])][faceSurfEdges[0] > 0 ? 0 : 1]
            ]
          modelVertices.push(v1)
          const uv1 = [
            (v1[0] * faceTexInfo.s[0] +
              v1[1] * faceTexInfo.s[1] +
              v1[2] * faceTexInfo.s[2] +
              faceTexInfo.sShift) /
              faceTexture.width,
            (v1[0] * faceTexInfo.t[0] +
              v1[1] * faceTexInfo.t[1] +
              v1[2] * faceTexInfo.t[2] +
              faceTexInfo.tShift) /
              faceTexture.height
          ]

          let v2 =
            vertices[
              edges[Math.abs(faceSurfEdges[1])][faceSurfEdges[1] > 0 ? 0 : 1]
            ]
          modelVertices.push(v2)

          let uv2 = [
            (v2[0] * faceTexInfo.s[0] +
              v2[1] * faceTexInfo.s[1] +
              v2[2] * faceTexInfo.s[2] +
              faceTexInfo.sShift) /
              faceTexture.width,
            (v2[0] * faceTexInfo.t[0] +
              v2[1] * faceTexInfo.t[1] +
              v2[2] * faceTexInfo.t[2] +
              faceTexInfo.tShift) /
              faceTexture.height
          ]

          for (let j = 2; j < faces[i].edgeCount; ++j) {
            const v3 =
              vertices[
                edges[Math.abs(faceSurfEdges[j])][faceSurfEdges[j] > 0 ? 0 : 1]
              ]
            const uv3 = [
              (v3[0] * faceTexInfo.s[0] +
                v3[1] * faceTexInfo.s[1] +
                v3[2] * faceTexInfo.s[2] +
                faceTexInfo.sShift) /
                faceTexture.width,
              (v3[0] * faceTexInfo.t[0] +
                v3[1] * faceTexInfo.t[1] +
                v3[2] * faceTexInfo.t[2] +
                faceTexInfo.tShift) /
                faceTexture.height
            ]

            modelVertices.push(v3)
            modelUVs.push([uv1, uv3, uv2])
            modelFaces.push([
              modelVertices.length - j - 1,
              modelVertices.length - 1,
              modelVertices.length - 2
            ])
            modelTextureIndices.push(faceTexInfo.textureIndex)

            v2 = v3
            uv2 = uv3
          }
        }

        return {
          vertices: modelVertices,
          faces: modelFaces,
          uv: modelUVs,
          textureIndices: modelTextureIndices
        }
      }))(models, faces, edges, surfEdges, vertices, texinfo, textures)

    return new Map(entities, textures, parsedModels)
  }

  static async loadFromUrl(url: string, progressCallback: ProgressCallback) {
    const data = await xhr(url, {
      method: 'GET',
      isBinary: true,
      progressCallback
    })

    return Map.parseFromArrayBuffer(data)
  }
}

namespace Map {
  export enum Lump {
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
}

export { Map }
