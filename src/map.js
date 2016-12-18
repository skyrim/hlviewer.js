import Reader from './reader.js'
import Vdf from './vdf.js'
import Path from 'path'

const LUMP_ENTITIES     = 0
const LUMP_PLANES       = 1
const LUMP_TEXTURES     = 2
const LUMP_VERTICES     = 3
const LUMP_VISIBILITY   = 4
const LUMP_NODES        = 5
const LUMP_TEXINFO      = 6
const LUMP_FACES        = 7
const LUMP_LIGHTING     = 8
const LUMP_CLIPNODES    = 9
const LUMP_LEAVES       = 10
const LUMP_MARKSURFACES = 11
const LUMP_EDGES        = 12
const LUMP_SURFEDGES    = 13
const LUMP_MODELS       = 14
const HEADER_LUMPS      = 15

const INVISIBLE_ENTITIES = [
    'target_cdaudio',
    'trigger_auto',
    'trigger_autosave',
    'trigger_camera',
    'trigger_cdaudio',
    'trigger_changelevel',
    'trigger_changetarget',
    'trigger_counter',
    'trigger_endsection',
    'trigger_gravity',
    'trigger_hurt',
    'trigger_monsterjump',
    'trigger_multiple',
    'trigger_once',
    'trigger_push',
    'trigger_relay',
    'trigger_teleport',
    'trigger_transition',
    'func_bomb_target',
    'func_buyzone',
    'func_ladder"'
]

export default class Map {
    constructor(buffer) {
        let r = new Reader(buffer)
        let version = r.ui()
        if (version !== 30) {
            throw new Error(`Invalid map version. Expected 30, given ${version}`)
        }

        let lumps = []
        for (let i = 0; i < 15; ++i) {
            lumps.push({
                offset: r.ui(),
                length: r.ui()
            })
        }

        let parseEntities = (r) => {
            r.seek(lumps[LUMP_ENTITIES].offset)
            let entities = new Vdf(r.nstr(lumps[LUMP_ENTITIES].length))

            const VECTOR_ATTRS = ['origin', 'angles', '_diffuse_light', '_light', 'rendercolor', 'avelocity']
            const NUMBER_ATTRS = ['renderamt', 'rendermode']

            entities[0].wad = entities[0].wad.split(';').filter(w => w.length).map(w => w.replace(/\\/g, '/')).map(w => Path.basename(w))

            entities.forEach(e => {
                if (e.model) {
                    e.model = Number.parseInt(e.model.substr(1))
                }

                VECTOR_ATTRS.forEach(attr => {
                    if (e[attr]) {
                        e[attr] = e[attr].split(' ').map(v => Number.parseFloat(v))
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

        let parseTextures = (r) => {
            let parseTexture = (r) => {
                let parseMipMaps = (r, w, h) => {
                    let mipmaps = [0, 0, 0, 0].map((m, i) => r.arr((w * h) / Math.pow(1<<i, 2), r.ub.bind(r)))
                    
                    r.skip(2)

                    let palette = r.arr(256 * 3, r.ub.bind(r))

                    let data = mipmaps.map(m => {
                        let t = new Uint8Array(m.length * 4)

                        for (let i = 0; i < m.length; ++i) {
                            let r = palette[m[i] * 3]
                            let g = palette[m[i] * 3 + 1]
                            let b = palette[m[i] * 3 + 2]

                            if (r === 0 && g === 0 && b === 255) {
                                t[4 * i]     = 0
                                t[4 * i + 1] = 0
                                t[4 * i + 2] = 0
                                t[4 * i + 3] = 0
                            } else {
                                t[4 * i]     = r
                                t[4 * i + 1] = g
                                t[4 * i + 2] = b
                                t[4 * i + 3] = 255
                            }
                        }

                        return t
                    })

                    return data
                }

                let baseOffset = r.tell()

                let texture = {
                    name: r.nstr(16),
                    width: r.ui(),
                    height: r.ui(),
                    mipmaps: []
                }

                let mipmapOffset = r.ui()

                if (mipmapOffset !== 0) {
                    r.seek(baseOffset + mipmapOffset)
                    texture.mipmaps = parseMipMaps(r, texture.width, texture.height)
                }

                return texture
            }

            r.seek(lumps[LUMP_TEXTURES].offset)

            let count = r.ui()
            let offsets = []
            for (let i = 0; i < count; ++i) {
                offsets.push(r.ui())
            }

            let textures = []
            for (let i = 0; i < count; ++i) {
                r.seek(lumps[LUMP_TEXTURES].offset + offsets[i])

                textures.push(parseTexture(r))
            }

            return textures
        }

        let loadModels = (r, offset, length) => {
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

        let loadFaces = (r, offset, length) => {
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

        let loadEdges = (r, offset, length) => {
            r.seek(offset)

            let edges = []
            for (let i = 0; i < length / 4; ++i) {
                edges.push([r.us(), r.us()])
            }
            return edges
        }

        let loadSurfEdges = (r, offset, length) => {
            r.seek(offset)

            let surfEdges = []
            for (let i = 0; i < length / 4; ++i) {
                surfEdges.push(r.i())
            }
            return surfEdges
        }

        let loadVertices = (r, offset, length) => {
            r.seek(offset)

            let vertices = []
            for (let i = 0; i < length / 12; ++i) {
                vertices.push([r.f(), r.f(), r.f()])
            }
            return vertices
        }

        let loadTexInfo = (r, offset, length) => {
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

        this.entities = parseEntities(r)
        this.textures = parseTextures(r)

        let models = loadModels(r, lumps[LUMP_MODELS].offset, lumps[LUMP_MODELS].length)
        let faces = loadFaces(r, lumps[LUMP_FACES].offset, lumps[LUMP_FACES].length)
        let edges = loadEdges(r, lumps[LUMP_EDGES].offset, lumps[LUMP_EDGES].length)
        let surfEdges = loadSurfEdges(r, lumps[LUMP_SURFEDGES].offset, lumps[LUMP_SURFEDGES].length)
        let vertices = loadVertices(r, lumps[LUMP_VERTICES].offset, lumps[LUMP_VERTICES].length)
        let texinfo = loadTexInfo(r, lumps[LUMP_TEXINFO].offset, lumps[LUMP_TEXINFO].length)

        this.models = ((models, faces, edges, surfEdges, vertices, texinfo, textures, entities) => models
            .filter((model, modelIndex) => {
                let entity
                for (let i = 0; i < entities.length; ++i) {
                    if (entities[i].model === `*${modelIndex}`) {
                        entity = entities[i]
                    }
                }

                return !(entity && !(INVISIBLE_ENTITIES.indexOf(entity.classname) > -1) && !(entity.renderamt))
            })
            .map((model,lewl) => {
                let modelVertices = []
                let modelUVs = []
                let modelTextureIndices = []
                let modelFaces = []

                for (let i = model.firstFace; i < model.firstFace + model.faceCount; ++i) {
                    let faceTexInfo = texinfo[faces[i].textureInfo]
                    let faceTexture = textures[faceTexInfo.textureIndex]
                    let faceSurfEdges = surfEdges.slice(faces[i].firstEdge, faces[i].firstEdge + faces[i].edgeCount)

                    let v1 = vertices[edges[Math.abs(faceSurfEdges[0])][faceSurfEdges[0] > 0 ? 0 : 1]]
                    modelVertices.push(v1)
                    let uv1 = [(v1[0] * faceTexInfo.s[0] + v1[1] * faceTexInfo.s[1] + v1[2] * faceTexInfo.s[2] + faceTexInfo.sShift) / faceTexture.width,
                               (v1[0] * faceTexInfo.t[0] + v1[1] * faceTexInfo.t[1] + v1[2] * faceTexInfo.t[2] + faceTexInfo.tShift) / faceTexture.height]

                    let v2 = vertices[edges[Math.abs(faceSurfEdges[1])][faceSurfEdges[1] > 0 ? 0 : 1]]
                    modelVertices.push(v2)

                    let uv2 = [(v2[0] * faceTexInfo.s[0] + v2[1] * faceTexInfo.s[1] + v2[2] * faceTexInfo.s[2] + faceTexInfo.sShift) / faceTexture.width,
                               (v2[0] * faceTexInfo.t[0] + v2[1] * faceTexInfo.t[1] + v2[2] * faceTexInfo.t[2] + faceTexInfo.tShift) / faceTexture.height]

                    for (let j = 2; j < faces[i].edgeCount; ++j) {
                        let v3 = vertices[edges[Math.abs(faceSurfEdges[j])][faceSurfEdges[j] > 0 ? 0 : 1]]
                        let uv3 = [(v3[0] * faceTexInfo.s[0] + v3[1] * faceTexInfo.s[1] + v3[2] * faceTexInfo.s[2] + faceTexInfo.sShift) / faceTexture.width,
                                   (v3[0] * faceTexInfo.t[0] + v3[1] * faceTexInfo.t[1] + v3[2] * faceTexInfo.t[2] + faceTexInfo.tShift) / faceTexture.height]
                        
                        modelVertices.push(v3)
                        modelUVs.push([uv1, uv3, uv2])
                        modelFaces.push([modelVertices.length - j - 1, modelVertices.length - 1, modelVertices.length - 2])
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
            }
        ))(models, faces, edges, surfEdges, vertices, texinfo, this.textures, this.entities)
    }
}