import { Tga } from './Parsers/Tga'
import { Sprite } from './Parsers/Sprite'
import { BspLightmap } from './BspLightmap'

export interface BspTexture {
  name: string
  width: number
  height: number
  data: Uint8Array
  isExternal: boolean
}

export interface BspModel {
  origin: number[]
  faces: {
    buffer: Float32Array
    textureIndex: number
  }[]
}

export class Bsp {
  name: string
  entities: any[]
  textures: BspTexture[]
  models: BspModel[]
  lightmap: BspLightmap
  skies: Tga[] = []
  sprites: { [name: string]: Sprite } = {}

  constructor(
    name: string,
    entities: any[],
    textures: BspTexture[],
    models: BspModel[],
    lightmap: BspLightmap
  ) {
    this.name = name
    this.entities = entities
    this.textures = textures
    this.models = models
    this.lightmap = lightmap
  }
}
