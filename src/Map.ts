import * as Path from 'path'
import { Reader } from './Reader'
import { vdf } from './Vdf'
import { ProgressCallback, xhr } from './Xhr'

function parseEntities(r: Reader, lumps: any[]) {
  r.seek(lumps[Map.Lump.Entities].offset)
  let entities = vdf(r.nstr(lumps[Map.Lump.Entities].length))

  const VECTOR_ATTRS = [
    'origin',
    'angles',
    '_diffuse_light',
    '_light',
    'rendercolor',
    'avelocity'
  ]
  const NUMBER_ATTRS = ['renderamt', 'rendermode']

  let worldSpawn = entities[0]
  if (worldSpawn.wad) {
    worldSpawn.wad = worldSpawn.wad
      .split(';')
      .filter((w: string) => w.length)
      .map((w: string) => w.replace(/\\/g, '/'))
      .map((w: string) => Path.basename(w))
  }

  entities.forEach(e => {
    if (e.model) {
      let modelNum = Number.parseInt(e.model.substr(1))
      if (!isNaN(modelNum)) {
        e.model = modelNum
      }

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

class Map {
  name: string
  entities: any[]
  textures: any[]
  models: any[]
  skies: any[]

  constructor(entities: any[], textures: any[], models: any[], skies = []) {
    this.entities = entities
    this.textures = textures
    this.models = models
    this.skies = skies
  }

  // TODO: refactor everything related to this
  hasMissingTextures() {
    for (let i = 0; i < this.textures.length; ++i) {
      const texture = this.textures[i]
      if (texture.mipmaps.length !== texture.width * texture.height) {
        return true
      }
    }

    return false
  }

  static parseFromArrayBuffer(buffer: ArrayBuffer) {
    let r = new Reader(buffer)
    let version = r.ui()
    if (version !== 30) {
      throw new Error('Invalid map version')
    }

    let lumps: any[] = []
    for (let i = 0; i < 15; ++i) {
      lumps.push({
        offset: r.ui(),
        length: r.ui()
      })
    }

    let parseTextures = (r: Reader) => {
      let parseTexture = (r: Reader) => {
        let parseMipMaps = (r: Reader, texture: any) => {
          let isTransparent = texture.name.charAt(0) === '{'
          let w = texture.width
          let h = texture.height

          let mipmaps = [r.arrx(w * h, Reader.Type.UByte)]
          r.skip((21 * w * h) / 64 + 2)

          let palette = r.arrx(256 * 3, Reader.Type.UByte)

          return mipmaps.map(m => {
            let t = new Uint8Array(m.length * 4)

            for (let i = 0; i < m.length; ++i) {
              if (isTransparent && m[i] === 255) {
                t[4 * i + 3] = 0
              } else {
                t[4 * i] = palette[m[i] * 3]
                t[4 * i + 1] = palette[m[i] * 3 + 1]
                t[4 * i + 2] = palette[m[i] * 3 + 2]
                t[4 * i + 3] = 255
              }
            }

            return t
          })
        }

        let baseOffset = r.tell()

        let texture = {
          name: r.nstr(16),
          width: r.ui(),
          height: r.ui(),
          mipmaps: [new Uint8Array(4)]
        }

        let mipmapOffset = r.ui()

        if (mipmapOffset !== 0) {
          r.seek(baseOffset + mipmapOffset)
          texture.mipmaps = parseMipMaps(r, texture)
        }

        return texture
      }

      r.seek(lumps[Map.Lump.Textures].offset)

      let count = r.ui()
      let offsets = []
      for (let i = 0; i < count; ++i) {
        offsets.push(r.ui())
      }

      let textures = []
      for (let i = 0; i < count; ++i) {
        if (offsets[i] === 0xffffffff) {
          let mipmap = new Uint8Array([0, 255, 0, 255])
          textures.push({
            name: 'ERROR404',
            width: 1,
            height: 1,
            mipmaps: [mipmap, mipmap, mipmap, mipmap]
          })
        } else {
          r.seek(lumps[Map.Lump.Textures].offset + offsets[i])
          textures.push(parseTexture(r))
        }
      }

      return textures
    }

    let loadModels = (r: Reader, offset: number, length: number) => {
      r.seek(offset)

      let models = []
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

    let loadFaces = (r: Reader, offset: number, length: number) => {
      r.seek(offset)

      let faces = []
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

    let loadEdges = (r: Reader, offset: number, length: number) => {
      r.seek(offset)

      let edges = []
      for (let i = 0; i < length / 4; ++i) {
        edges.push([r.us(), r.us()])
      }
      return edges
    }

    let loadSurfEdges = (r: Reader, offset: number, length: number) => {
      r.seek(offset)

      let surfEdges = []
      for (let i = 0; i < length / 4; ++i) {
        surfEdges.push(r.i())
      }
      return surfEdges
    }

    let loadVertices = (r: Reader, offset: number, length: number) => {
      r.seek(offset)

      let vertices = []
      for (let i = 0; i < length / 12; ++i) {
        vertices.push([r.f(), r.f(), r.f()])
      }
      return vertices
    }

    let loadTexInfo = (r: Reader, offset: number, length: number) => {
      r.seek(offset)

      let texinfo = []
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

    let entities = parseEntities(r, lumps)
    let textures = parseTextures(r)

    let models = loadModels(
      r,
      lumps[Map.Lump.Models].offset,
      lumps[Map.Lump.Models].length
    )

    let faces = loadFaces(
      r,
      lumps[Map.Lump.Faces].offset,
      lumps[Map.Lump.Faces].length
    )

    let edges = loadEdges(
      r,
      lumps[Map.Lump.Edges].offset,
      lumps[Map.Lump.Edges].length
    )

    let surfEdges = loadSurfEdges(
      r,
      lumps[Map.Lump.SurfEdges].offset,
      lumps[Map.Lump.SurfEdges].length
    )

    let vertices = loadVertices(
      r,
      lumps[Map.Lump.Vertices].offset,
      lumps[Map.Lump.Vertices].length
    )

    let texinfo = loadTexInfo(
      r,
      lumps[Map.Lump.TexInfo].offset,
      lumps[Map.Lump.TexInfo].length
    )

    let parsedModels = ((
      models,
      faces,
      edges,
      surfEdges,
      vertices,
      texinfo,
      textures
    ) =>
      models.map(model => {
        let modelVertices = []
        let modelUVs = []
        let modelTextureIndices = []
        let modelFaces = []

        for (
          let i = model.firstFace;
          i < model.firstFace + model.faceCount;
          ++i
        ) {
          let faceTexInfo = texinfo[faces[i].textureInfo]
          let faceTexture = textures[faceTexInfo.textureIndex]
          let faceSurfEdges = surfEdges.slice(
            faces[i].firstEdge,
            faces[i].firstEdge + faces[i].edgeCount
          )

          let v1 =
            vertices[
              edges[Math.abs(faceSurfEdges[0])][faceSurfEdges[0] > 0 ? 0 : 1]
            ]
          modelVertices.push(v1)
          let uv1 = [
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
            let v3 =
              vertices[
                edges[Math.abs(faceSurfEdges[j])][faceSurfEdges[j] > 0 ? 0 : 1]
              ]
            let uv3 = [
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

  static loadFromUrl(url: string, progressCallback: ProgressCallback) {
    return xhr(url, {
      method: 'GET',
      isBinary: true,
      progressCallback
    }).then(response => Map.parseFromArrayBuffer(response))
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
