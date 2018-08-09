import * as THREE from 'three'
import { Face3, Mesh, Vector2 as Vec2, Vector3 as Vec3 } from 'three'
import { Game } from './Game'
import { Map } from './Map'

const resizeTexture = (
  pixels: Uint8Array,
  width: number,
  height: number,
  newWidth: number,
  newHeight: number
) => {
  let canvas = document.createElement('canvas')
  let ctx = canvas.getContext('2d')
  if (!ctx) {
    throw new Error('Runtime error.')
  }
  canvas.width = width
  canvas.height = height

  let nc = document.createElement('canvas')
  let nctx = nc.getContext('2d')
  if (!nctx) {
    throw new Error('Runtime error.')
  }
  nc.width = newWidth
  nc.height = newHeight

  let cid = ctx.createImageData(width, height)
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

const createTexture = (data: any, renderer: THREE.WebGLRenderer) => {
  let pixels = data.mipmaps[0]
  let w = data.width
  let h = data.height

  if (!isPowerOfTwo(w) || !isPowerOfTwo(h)) {
    let nw = nextPowerOfTwo(w)
    let nh = nextPowerOfTwo(h)
    pixels = resizeTexture(pixels, w, h, nw, nh)
    w = nw
    h = nh
  }

  let texture = new THREE.DataTexture(
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
  texture.anisotropy = renderer.capabilities.getMaxAnisotropy()
  texture.generateMipmaps = true

  return texture
}

const createMissingTexture = () => {
  let pixels = new Uint8Array([
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

  let texture = new THREE.DataTexture(
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

const createMaterials = (map: Map, renderer: THREE.WebGLRenderer) =>
  map.textures.map(data => {
    let texture
    if (data.mipmaps.length > 0) {
      texture = createTexture(data, renderer)
    } else {
      texture = createMissingTexture()
    }

    texture.name = data.name
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.y = -1
    texture.needsUpdate = true

    let visible = true
    let lowerName = data.name.toLowerCase()
    for (let i = 0; i < INVISIBLE_TEXTURES.length; ++i) {
      if (INVISIBLE_TEXTURES[i] === lowerName) {
        visible = false
        break
      }
    }

    return new THREE.MeshLambertMaterial({
      map: texture,
      transparent: true,
      alphaTest: 0.5,
      visible
    })
  })

const createModels = (map: Map, materials: any[]) => {
  return map.models.map(model => {
    let geometry = new THREE.Geometry()

    geometry.vertices = model.vertices.map(
      (vertex: any) => new Vec3(vertex[0], vertex[1], vertex[2])
    )

    geometry.faces = model.faces.map((face: any, i: number) => {
      let f = new Face3(face[0], face[1], face[2])
      f.materialIndex = model.textureIndices[i]
      return f
    })

    geometry.faceVertexUvs[0] = model.uv.map((uv: any) => [
      new Vec2(uv[0][0], uv[0][1] * -1),
      new Vec2(uv[1][0], uv[1][1] * -1),
      new Vec2(uv[2][0], uv[2][1] * -1)
    ])

    let nfuv: any[] = []
    let nf = geometry.faces.filter((face, i) => {
      let mat: any = materials[face.materialIndex]
      let lowerName = mat.map.name.toLowerCase()
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

    return new Mesh(geometry, materials.map(m => m.clone()))
  })
}

const createBlankSky = () => {
  let geometry = new THREE.BoxGeometry(-1000, 1000, 1000)
  let material = new THREE.MeshBasicMaterial({ color: 0x88aae2 })
  return new THREE.Mesh(geometry, material)
}

const createSky = (skies: any, renderer: THREE.WebGLRenderer) => {
  let geometry
  let material

  if (skies.length !== 6) {
    throw new Error('Invalid number of sky textures given.')
  }

  let canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 1024
  let ctx = canvas.getContext('2d')

  let coords: any = {
    up: [0, 256],
    rt: [0, 512],
    ft: [256, 512],
    lf: [512, 512],
    bk: [768, 512],
    dn: [0, 768]
  }

  skies.forEach((sky: any) => {
    let smc = document.createElement('canvas')
    let smctx = smc.getContext('2d')
    if (!smctx) {
      throw new Error('Runtime error.')
    }
    smc.width = sky.width
    smc.height = sky.height
    let imageData = smctx.getImageData(0, 0, smc.width, smc.height)
    for (let i = 0; i < sky.data.length; ++i) {
      imageData.data[i] = sky.data[i]
    }
    smctx.putImageData(imageData, 0, 0)

    let c = coords[sky.name.slice(-2)]

    // TODO: remove this check
    if (!ctx) {
      throw new Error('Runtime error.')
    }
    ctx.drawImage(smc, c[0], c[1])
  })

  let texture = new THREE.Texture(canvas)
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
  let uvs = [
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

class Resources {
  game: Game
  models: any[]
  sky: any

  constructor(game: Game) {
    this.game = game
    this.models = []
    this.sky = createBlankSky()
  }

  clear() {
    this.models.forEach(model => {
      model.geometry.dispose()
      model.material.materials.forEach((material: any) => {
        material.map.dispose()
        material.dispose()
      })
    })

    if (this.sky) {
      this.sky.geometry.dispose()
      if (this.sky.material) {
        this.sky.material.dispose()
      }
    }

    this.models.length = 0
    this.sky = createBlankSky()
  }

  initialize(map: Map) {
    this.clear()

    this.sky = createSky(map.skies, this.game.renderer)

    let materials = createMaterials(map, this.game.renderer)
    let models = createModels(map, materials)
    models.forEach(model => {
      this.models.push(model)
    })
  }
}

export { Resources }
