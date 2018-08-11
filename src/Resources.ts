import * as THREE from 'three'
import { Face3, Mesh, Vector2 as Vec2, Vector3 as Vec3 } from 'three'
import { Game } from './Game'
import { Map } from './Map'
import { Tga } from './Parsers/Tga'
import { Sprite, SpriteType, SpriteAlphaType } from './Parsers/Sprite'
import { Entity } from './Entities';

const resizeTexture = (
  pixels: Uint8Array,
  width: number,
  height: number,
  newWidth: number,
  newHeight: number
) => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    throw new Error('Runtime error.')
  }
  canvas.width = width
  canvas.height = height

  const nc = document.createElement('canvas')
  const nctx = nc.getContext('2d')
  if (!nctx) {
    throw new Error('Runtime error.')
  }
  nc.width = newWidth
  nc.height = newHeight

  const cid = ctx.createImageData(width, height)
  for (let i = 0, size = width * height * 4; i < size; i += 4) {
    cid.data[i] = pixels[i]
    cid.data[i + 1] = pixels[i + 1]
    cid.data[i + 2] = pixels[i + 2]
    cid.data[i + 3] = pixels[i + 3]
  }
  ctx.putImageData(cid, 0, 0)

  nctx.drawImage(canvas, 0, 0, newWidth, newHeight)

  return new Uint8Array(nctx.getImageData(0, 0, newWidth, newHeight).data)
}

const isPowerOfTwo = (n: number) => (n & (n - 1)) === 0

const nextPowerOfTwo = (n: number) => {
  --n
  for (let i = 1; i < 32; i <<= 1) {
    n = n | (n >> i)
  }
  return n + 1
}

const createTexture = (params: {
  width: number
  height: number
  pixels: Uint8Array
  renderer: THREE.WebGLRenderer
}) => {
  let w = params.width
  let h = params.height
  let pixels = params.pixels

  // let pixels = data.mipmaps[0]
  // let w = data.width
  // let h = data.height

  if (!isPowerOfTwo(w) || !isPowerOfTwo(h)) {
    const nw = nextPowerOfTwo(w)
    const nh = nextPowerOfTwo(h)
    pixels = resizeTexture(pixels, w, h, nw, nh)
    w = nw
    h = nh
  }

  const texture = new THREE.DataTexture(
    pixels,
    w,
    h,
    THREE.RGBAFormat,
    THREE.UnsignedByteType,
    THREE.Texture.DEFAULT_MAPPING,
    THREE.ClampToEdgeWrapping,
    THREE.ClampToEdgeWrapping,
    THREE.LinearFilter,
    THREE.LinearMipMapLinearFilter
  )

  texture.premultiplyAlpha = true
  texture.anisotropy = params.renderer.capabilities.getMaxAnisotropy()
  texture.generateMipmaps = true

  return texture
}

const createMissingTexture = () => {
  const pixels = new Uint8Array([
    255,
    255,
    255,
    255,
    255,
    128,
    0,
    255,
    255,
    128,
    0,
    255,
    255,
    255,
    255,
    255
  ])

  const texture = new THREE.DataTexture(
    pixels,
    2,
    2,
    THREE.RGBAFormat,
    THREE.UnsignedByteType,
    THREE.Texture.DEFAULT_MAPPING,
    THREE.ClampToEdgeWrapping,
    THREE.ClampToEdgeWrapping,
    THREE.NearestFilter,
    THREE.NearestFilter
  )

  return texture
}

const INVISIBLE_TEXTURES = [
  'aaatrigger',
  'clip',
  'null',
  'hint',
  'nodraw',
  'invisible',
  'skip',
  'trigger',
  'sky',
  'fog'
]

const createMaterials = (map: Map, renderer: THREE.WebGLRenderer) => {
  const materials: { [name: string]: THREE.MeshLambertMaterial } = {}

  map.textures.forEach(texture => {
    let map
    if (texture.data.length > 0) {
      map = createTexture({
        width: texture.width,
        height: texture.height,
        pixels: texture.data,
        renderer
      })
    } else {
      map = createMissingTexture()
    }

    map.name = texture.name
    map.wrapS = THREE.RepeatWrapping
    map.wrapT = THREE.RepeatWrapping
    map.repeat.y = -1
    map.needsUpdate = true

    let visible = true
    const lowerName = texture.name.toLowerCase()
    for (let i = 0; i < INVISIBLE_TEXTURES.length; ++i) {
      if (INVISIBLE_TEXTURES[i] === lowerName) {
        visible = false
        break
      }
    }

    materials[texture.name] = new THREE.MeshLambertMaterial({
      map: map,
      transparent: true,
      alphaTest: 0.5,
      visible
    })
  })

  Object.entries(map.sprites).forEach(([name, sprite]) => {
    const texture = createTexture({
      width: sprite.header.width,
      height: sprite.header.height,
      pixels: sprite.frames[0].data,
      renderer
    })

    texture.name = name
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.y = -1
    texture.needsUpdate = true

    materials[name] = new THREE.MeshLambertMaterial({
      map: texture,
      transparent: true,
      alphaTest: 0.5,
      visible: true
    })
  })

  return materials
}

const createModels = (
  map: Map,
  materials: { [name: string]: THREE.MeshLambertMaterial }
) => {
  const models: { [name: string]: Model } = {}
  const orderedMaterials = Object.values(materials)

  map.models.forEach((model, i) => {
    const geometry = new THREE.Geometry()

    geometry.vertices = model.vertices.map(
      vertex => new Vec3(vertex[0], vertex[1], vertex[2])
    )

    geometry.faces = model.faces.map((face, i) => {
      const f = new Face3(face[0], face[1], face[2])
      f.materialIndex = model.textureIndices[i]
      return f
    })

    geometry.faceVertexUvs[0] = model.uv.map(uv => [
      new Vec2(uv[0][0], uv[0][1] * -1),
      new Vec2(uv[1][0], uv[1][1] * -1),
      new Vec2(uv[2][0], uv[2][1] * -1)
    ])

    const nfuv: THREE.Vector2[][] = []
    const nf = geometry.faces.filter((face, i) => {
      const mat = orderedMaterials[face.materialIndex]
      const lowerName = mat.map.name.toLowerCase()
      for (let j = 0; j < INVISIBLE_TEXTURES.length; ++j) {
        if (INVISIBLE_TEXTURES[j] === lowerName) {
          return false
        }
      }

      nfuv.push(geometry.faceVertexUvs[0][i])
      return true
    })
    geometry.faces = nf
    geometry.faceVertexUvs[0] = nfuv

    geometry.mergeVertices()

    models[`*${i}`] = new ModelBasic(
      new Mesh(geometry, orderedMaterials.map(m => m.clone()))
    )
  })

  return models
}

const createSpriteModels = (
  map: Map,
  materials: { [name: string]: THREE.MeshLambertMaterial }
) => {
  const models: { [name: string]: Model } = {}

  for (const [name, sprite] of Object.entries(map.sprites)) {
    const geometry = new THREE.PlaneGeometry(
      sprite.header.width,
      sprite.header.height
    )

    const material = materials[name]

    models[name] = new ModelSprite(new Mesh(geometry, material), sprite)
  }

  return models
}

const createBlankSky = () => {
  const geometry = new THREE.BoxGeometry(-1000, 1000, 1000)
  const material = new THREE.MeshBasicMaterial({ color: 0x88aae2 })
  return new THREE.Mesh(geometry, material)
}

const createSky = (skies: Tga[], renderer: THREE.WebGLRenderer) => {
  let geometry
  let material

  if (skies.length !== 6) {
    throw new Error('Invalid number of sky textures given.')
  }

  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 1024
  const ctx = canvas.getContext('2d')

  const coords: { [name: string]: number[] } = {
    up: [0, 256],
    rt: [0, 512],
    ft: [256, 512],
    lf: [512, 512],
    bk: [768, 512],
    dn: [0, 768]
  }

  skies.forEach((sky: Tga) => {
    const smc = document.createElement('canvas')
    const smctx = smc.getContext('2d')
    if (!smctx) {
      throw new Error('Runtime error.')
    }
    smc.width = sky.width
    smc.height = sky.height
    const imageData = smctx.getImageData(0, 0, smc.width, smc.height)
    for (let i = 0; i < sky.data.length; ++i) {
      imageData.data[i] = sky.data[i]
    }
    smctx.putImageData(imageData, 0, 0)

    const side = sky.name.slice(-2)
    const c = coords[side] ? coords[side] : []

    // TODO: remove this check
    if (!ctx) {
      throw new Error('Runtime error.')
    }
    ctx.drawImage(smc, c[0], c[1])
  })

  const texture = new THREE.Texture(canvas)
  texture.wrapS = THREE.ClampToEdgeWrapping
  texture.wrapT = THREE.ClampToEdgeWrapping
  if (renderer) {
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy()
  }
  texture.needsUpdate = true

  material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide
  })

  geometry = new THREE.BoxGeometry(4096, 4096, 4096)
  const uvs = [
    // back
    [[0.75, 0.499], [1.0, 0.499], [0.75, 0.251]],
    [[1.0, 0.499], [1.0, 0.251], [0.75, 0.251]],
    // front
    [[0.5, 0.251], [0.25, 0.251], [0.5, 0.499]],
    [[0.25, 0.251], [0.25, 0.499], [0.5, 0.499]],
    // left
    [[0.5, 0.251], [0.5, 0.499], [0.75, 0.251]],
    [[0.5, 0.499], [0.75, 0.499], [0.75, 0.251]],
    // right
    [[0.25, 0.5], [0.25, 0.25], [0.0, 0.5]],
    [[0.25, 0.25], [0.0, 0.25], [0.0, 0.5]],
    // up
    [[0.249, 0.749], [0.249, 0.5], [0.0, 0.749]],
    [[0.249, 0.5], [0.0, 0.5], [0.0, 0.749]],
    // down
    [[0.0, 0.0], [0.0, 0.25], [0.249, 0.0]],
    [[0.0, 0.25], [0.249, 0.25], [0.249, 0.0]]
  ]
  geometry.faceVertexUvs[0] = uvs.map(uv => [
    new THREE.Vector2(uv[0][0], uv[0][1]),
    new THREE.Vector2(uv[1][0], uv[1][1]),
    new THREE.Vector2(uv[2][0], uv[2][1])
  ])
  geometry.rotateZ((90 * Math.PI) / 180)

  return new THREE.Mesh(geometry, material)
}

export interface Model {
  mesh: THREE.Mesh
  clone: () => Model
  update: (dt: number, entity: Entity, game: Game) => void
}

export class ModelBasic implements Model {
  mesh: THREE.Mesh

  constructor(mesh: THREE.Mesh) {
    this.mesh = mesh
  }

  clone() {
    return new ModelBasic(this.mesh.clone())
  }

  update() {}
}

export class ModelSprite implements Model {
  mesh: THREE.Mesh
  sprite: Sprite

  constructor(mesh: THREE.Mesh, sprite: Sprite) {
    this.mesh = mesh
    this.sprite = sprite
    mesh.rotation.x = Math.PI / 2
    mesh.rotation.order = 'ZXY'
    mesh.up.x = 0
    mesh.up.y = 0
    mesh.up.z = 1;
    (mesh.material as any).side = THREE.DoubleSide

    switch (sprite.header.alphaType) {
      case SpriteAlphaType.SPR_ADDITIVE: {
        const material = (mesh.material as THREE.MeshLambertMaterial)
        material.blending = THREE.AdditiveBlending
      }
    }
  }

  clone() {
    return new ModelSprite(this.mesh.clone(), this.sprite)
  }

  update(_dt: number, entity: Entity, game: Game) {
    const mesh = this.mesh

    const origin = entity.meta['origin']
    mesh.position.x = origin[0]
    mesh.position.y = origin[1]
    mesh.position.z = origin[2]   

    const scale = entity.meta['scale']
    mesh.scale.x = scale
    mesh.scale.y = scale
    mesh.scale.z = scale

    switch (this.sprite.header.type) {
      case SpriteType.VP_PARALLEL: {
        mesh.lookAt(game.camera.position)
        break
      }

      case SpriteType.VP_PARALLEL_UPRIGHT: {
        mesh.rotation.x = 1.570796 // 90deg rad = pi/2
        mesh.rotation.y = game.camera.rotation.z

        break
      }

      case SpriteType.ORIENTED: {
        const rotation = entity.meta['angles']
        mesh.rotation.x = rotation[0] * 0.01745 // deg2rad
        mesh.rotation.y = rotation[2] * 0.01745
        mesh.rotation.z = rotation[1] * 0.01745
        break
      }

      case SpriteType.VP_PARALLEL_ORIENTED: {
        const rotation = entity.meta['angles']
        mesh.rotation.x = 1.570796 // 90deg rad = pi/2
        mesh.rotation.y = rotation[2] * 0.01745
        mesh.rotation.z = rotation[1] * 0.01745
        break
      }

      case SpriteType.FACING_UPRIGHT: {
        // TODO: incorrect, but will do for now
        mesh.lookAt(game.camera.position)
        break
      }
    }
  }
}

export class Resources {
  game: Game
  sky: THREE.Mesh
  models: { [name: string]: Model } = {}

  constructor(game: Game) {
    this.game = game
    this.sky = createBlankSky()
  }

  clear() {
    for (const model of Object.values(this.models)) {
      const mesh = model.mesh
      mesh.geometry.dispose()
      if (Array.isArray(mesh.material)) {
        mesh.material.forEach(material => {
          if (material instanceof THREE.MeshLambertMaterial) {
            material.map.dispose()
          } else {
            throw new Error('Material not of type MeshLambertMaterial')
          }

          material.dispose()
        })
      } else {
        if (mesh.material instanceof THREE.MeshLambertMaterial) {
          mesh.material.map.dispose()
        } else {
          throw new Error('Material not of type MeshLambertMaterial')
        }
        mesh.material.dispose()
      }
    }

    if (this.sky) {
      this.sky.geometry.dispose()
      if (this.sky.material instanceof THREE.MeshBasicMaterial) {
        this.sky.material.dispose()
      }
    }

    this.models = {}
    this.sky = createBlankSky()
  }

  initialize(map: Map) {
    this.clear()

    if (map.skies.length === 6) {
      this.sky = createSky(map.skies, this.game.renderer)
    }

    const materials = createMaterials(map, this.game.renderer)

    this.models = {
      ...createModels(map, materials),
      ...createSpriteModels(map, materials)
    }
  }
}
