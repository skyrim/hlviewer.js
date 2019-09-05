import { mat4, vec3 } from 'gl-matrix'
import { Bsp } from '../Bsp'
import { Camera } from './Camera'
import { Context } from './Context'
import { MainShader } from './WorldShader/WorldShader'
import { RenderMode } from '../Parsers/BspEntityParser'
import { Sprite, SpriteType } from '../Parsers/Sprite'
import { isPowerOfTwo, nextPowerOfTwo, resizeTexture } from './Util'

type FaceInfo = {
  offset: number
  length: number
  textureIndex: number
}
type ModelInfo = {
  origin: number[]
  offset: number
  length: number
  isTransparent: boolean
  faces: FaceInfo[]
}
type SceneInfo = {
  length: number
  data: Float32Array
  models: ModelInfo[]
}

export class WorldScene {
  static init(context: Context) {
    const shader = MainShader.init(context)
    if (!shader) {
      console.error('Failed to init MainShader')
      return null
    }

    shader.useProgram(context.gl)

    const buffer = context.gl.createBuffer()
    if (!buffer) {
      console.error('Failed to create WebGL buffer')
      return null
    }

    return new WorldScene({ buffer, context, shader })
  }

  private buffer: WebGLBuffer
  private context: Context
  private shader: MainShader
  private modelMatrix: mat4 = mat4.create()

  private sceneInfo: SceneInfo = {
    length: 0,
    data: new Float32Array(0),
    models: []
  }
  private bsp: Bsp | null = null
  private textures: {
    name: string
    width: number
    height: number
    data: Uint8Array
    handle: WebGLTexture
  }[] = []
  private sprites: { [name: string]: Sprite } = {}
  private lightmap: {
    data: Uint8Array
    handle: WebGLTexture
  } | null = null
  private constructor(params: {
    context: Context
    buffer: WebGLBuffer
    shader: MainShader
  }) {
    this.buffer = params.buffer
    this.context = params.context
    this.shader = params.shader
  }

  changeMap(bsp: Bsp) {
    this.fillBuffer(bsp)
    this.loadTextures(bsp)
    this.loadSpriteTextures(bsp)
    this.loadLightmap(bsp)
    this.bsp = bsp
  }

  private fillBuffer(bsp: Bsp) {
    const gl = this.context.gl
    const models = bsp.models

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

    // get total buffer size
    let size = 0
    for (let i = 0; i < models.length; ++i) {
      const model = models[i]
      for (let j = 0; j < model.faces.length; ++j) {
        const texture = bsp.textures[model.faces[j].textureIndex]
        if (INVISIBLE_TEXTURES.indexOf(texture.name) > -1) {
          continue
        }

        size += model.faces[j].buffer.length
      }
    }

    // add 6 vertex for a single quad that will be used to render sprites
    size += 7 * 6

    // init scene info structure and buffer with the appropriate size
    const sceneInfo: SceneInfo = {
      length: size,
      data: new Float32Array(size),
      models: []
    }

    // fill the scene info structure
    let currentVertex = 0
    for (let i = 0; i < bsp.models.length; ++i) {
      const model = bsp.models[i]
      const modelInfo: ModelInfo = {
        origin: model.origin,
        offset: currentVertex,
        length: 0,
        isTransparent: false,
        faces: []
      }

      for (let j = 0; j < model.faces.length; ++j) {
        const texture = bsp.textures[model.faces[j].textureIndex]
        if (INVISIBLE_TEXTURES.indexOf(texture.name) > -1) {
          continue
        }

        const faceInfo: FaceInfo = {
          offset: currentVertex,
          length: 0,
          textureIndex: -1
        }

        for (let k = 0; k < model.faces[j].buffer.length; ++k) {
          sceneInfo.data[currentVertex++] = model.faces[j].buffer[k]
        }

        if (
          !modelInfo.isTransparent &&
          bsp.textures[model.faces[j].textureIndex].name[0] === '{'
        ) {
          modelInfo.isTransparent = true
        }

        faceInfo.textureIndex = model.faces[j].textureIndex
        faceInfo.length = currentVertex - faceInfo.offset
        modelInfo.faces.push(faceInfo)
      }

      modelInfo.length = currentVertex - modelInfo.offset
      sceneInfo.models.push(modelInfo)
    }

    // set data of the last quad used for rendering sprites
    sceneInfo.models.push({
      origin: [0, 0, 0],
      offset: currentVertex,
      length: 4,
      isTransparent: false, // unused
      faces: [
        {
          offset: currentVertex,
          length: 4,
          textureIndex: 0 // unused
        }
      ]
    })
    sceneInfo.data[currentVertex++] = -0.5
    sceneInfo.data[currentVertex++] = 0
    sceneInfo.data[currentVertex++] = -0.5
    sceneInfo.data[currentVertex++] = 1
    sceneInfo.data[currentVertex++] = 1
    sceneInfo.data[currentVertex++] = 0
    sceneInfo.data[currentVertex++] = 0

    sceneInfo.data[currentVertex++] = 0.5
    sceneInfo.data[currentVertex++] = 0
    sceneInfo.data[currentVertex++] = 0.5
    sceneInfo.data[currentVertex++] = 0
    sceneInfo.data[currentVertex++] = 0
    sceneInfo.data[currentVertex++] = 0
    sceneInfo.data[currentVertex++] = 0

    sceneInfo.data[currentVertex++] = -0.5
    sceneInfo.data[currentVertex++] = 0
    sceneInfo.data[currentVertex++] = 0.5
    sceneInfo.data[currentVertex++] = 1
    sceneInfo.data[currentVertex++] = 0
    sceneInfo.data[currentVertex++] = 0
    sceneInfo.data[currentVertex++] = 0

    sceneInfo.data[currentVertex++] = -0.5
    sceneInfo.data[currentVertex++] = 0
    sceneInfo.data[currentVertex++] = -0.5
    sceneInfo.data[currentVertex++] = 1
    sceneInfo.data[currentVertex++] = 1
    sceneInfo.data[currentVertex++] = 0
    sceneInfo.data[currentVertex++] = 0

    sceneInfo.data[currentVertex++] = 0.5
    sceneInfo.data[currentVertex++] = 0
    sceneInfo.data[currentVertex++] = -0.5
    sceneInfo.data[currentVertex++] = 0
    sceneInfo.data[currentVertex++] = 1
    sceneInfo.data[currentVertex++] = 0
    sceneInfo.data[currentVertex++] = 0

    sceneInfo.data[currentVertex++] = 0.5
    sceneInfo.data[currentVertex++] = 0
    sceneInfo.data[currentVertex++] = 0.5
    sceneInfo.data[currentVertex++] = 0
    sceneInfo.data[currentVertex++] = 0
    sceneInfo.data[currentVertex++] = 0
    sceneInfo.data[currentVertex++] = 0

    // sort each model's face in scene info structure by texture index
    // and merge faces with same texture to lower draw calls
    currentVertex = 0
    const sortedSceneInfo: SceneInfo = {
      data: new Float32Array(sceneInfo.data),
      length: sceneInfo.length,
      models: sceneInfo.models.map(model => ({
        origin: [...model.origin],
        offset: model.offset,
        length: model.length,
        isTransparent: model.isTransparent,
        faces: model.faces.map(face => ({
          offset: face.offset,
          length: face.length,
          textureIndex: face.textureIndex
        }))
      }))
    }
    for (let i = 0; i < sortedSceneInfo.models.length; ++i) {
      const model = sortedSceneInfo.models[i]
      model.faces.sort((a, b) => a.textureIndex - b.textureIndex)

      for (let j = 0; j < model.faces.length; ++j) {
        const face = model.faces[j]
        const newOffset = currentVertex

        for (let k = 0; k < face.length; ++k) {
          sortedSceneInfo.data[currentVertex] = sceneInfo.data[face.offset + k]
          currentVertex += 1
        }

        face.offset = newOffset
      }

      const newFaces: FaceInfo[] = []
      let currentTextureIndex = -1
      for (let j = 0; j < model.faces.length; ++j) {
        const face = model.faces[j]

        if (face.textureIndex === currentTextureIndex) {
          newFaces[newFaces.length - 1].length += face.length
        } else {
          // merge
          newFaces.push({
            offset: face.offset,
            length: face.length,
            textureIndex: face.textureIndex
          })
          currentTextureIndex = face.textureIndex
        }
      }
      model.faces = newFaces
    }
    this.sceneInfo = sortedSceneInfo

    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer)
    gl.bufferData(gl.ARRAY_BUFFER, this.sceneInfo.data, gl.STATIC_DRAW)
  }

  private loadTextures(bsp: Bsp) {
    const gl = this.context.gl

    for (let i = 0; i < bsp.textures.length; ++i) {
      const glTexture = gl.createTexture()
      if (!glTexture) {
        // shouldnt happen
        // TODO: handle better
        throw new Error('fatal error')
      }

      const texture = bsp.textures[i]
      if (!isPowerOfTwo(texture.width) || !isPowerOfTwo(texture.height)) {
        const w = texture.width
        const h = texture.height
        const nw = nextPowerOfTwo(texture.width)
        const nh = nextPowerOfTwo(texture.height)
        texture.data = resizeTexture(texture.data, w, h, nw, nh)
        texture.width = nw
        texture.height = nh
      }

      gl.bindTexture(gl.TEXTURE_2D, glTexture)
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        texture.width,
        texture.height,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        texture.data
      )
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_MIN_FILTER,
        gl.LINEAR_MIPMAP_LINEAR
      )
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT)
      gl.generateMipmap(gl.TEXTURE_2D)

      const anisotropy = this.context.getAnisotropyExtension()
      if (anisotropy) {
        gl.texParameteri(
          gl.TEXTURE_2D,
          anisotropy.TEXTURE_MAX_ANISOTROPY_EXT,
          this.context.getMaxAnisotropy(anisotropy)
        )
      }

      this.textures.push({
        name: texture.name,
        width: texture.width,
        height: texture.height,
        data: texture.data,
        handle: glTexture
      })
    }
  }

  private loadSpriteTextures(bsp: Bsp) {
    const gl = this.context.gl

    for (const [name, sprite] of Object.entries(bsp.sprites)) {
      const glTexture = gl.createTexture()
      if (!glTexture) {
        // shouldnt happen
        // TODO: handle better
        throw new Error('fatal error')
      }

      const texture = sprite.frames[0]
      if (!isPowerOfTwo(texture.width) || !isPowerOfTwo(texture.height)) {
        const w = texture.width
        const h = texture.height
        const nw = nextPowerOfTwo(texture.width)
        const nh = nextPowerOfTwo(texture.height)
        texture.data = resizeTexture(texture.data, w, h, nw, nh)
        texture.width = nw
        texture.height = nh
      }

      gl.bindTexture(gl.TEXTURE_2D, glTexture)
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        texture.width,
        texture.height,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        texture.data
      )
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_MIN_FILTER,
        gl.LINEAR_MIPMAP_LINEAR
      )
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT)
      gl.generateMipmap(gl.TEXTURE_2D)

      const anisotropy = this.context.getAnisotropyExtension()
      if (anisotropy) {
        gl.texParameteri(
          gl.TEXTURE_2D,
          anisotropy.TEXTURE_MAX_ANISOTROPY_EXT,
          this.context.getMaxAnisotropy(anisotropy)
        )
      }

      this.textures.push({
        name: name,
        width: texture.width,
        height: texture.height,
        data: texture.data,
        handle: glTexture
      })
      this.sprites[name] = sprite
    }
  }

  private loadLightmap(bsp: Bsp) {
    const gl = this.context.gl

    const glLightmap = gl.createTexture()
    if (!glLightmap) {
      // shouldnt happen
      // TODO: handle better
      throw new Error('fatal error')
    }

    gl.bindTexture(gl.TEXTURE_2D, glLightmap)
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      bsp.lightmap.width,
      bsp.lightmap.height,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      bsp.lightmap.data
    )
    gl.generateMipmap(gl.TEXTURE_2D)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(
      gl.TEXTURE_2D,
      gl.TEXTURE_MIN_FILTER,
      gl.LINEAR_MIPMAP_LINEAR
    )

    this.lightmap = {
      data: bsp.lightmap.data,
      handle: glLightmap
    }
  }

  draw(camera: Camera, entities: any[]) {
    if (!this.bsp || !this.lightmap) {
      return
    }

    const gl = this.context.gl
    const shader = this.shader

    shader.useProgram(gl)

    camera.updateProjectionMatrix()
    camera.updateViewMatrix()

    shader.setViewMatrix(gl, camera.viewMatrix)
    shader.setProjectionMatrix(gl, camera.projectionMatrix)

    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer)
    shader.enableVertexAttribs(gl)
    shader.setVertexAttribPointers(gl)

    shader.setDiffuse(gl, 0)
    shader.setLightmap(gl, 1)

    gl.activeTexture(gl.TEXTURE1)
    gl.bindTexture(gl.TEXTURE_2D, this.lightmap.handle)

    gl.activeTexture(gl.TEXTURE0)

    const opaqueEntities = []
    const transparentEntities = []
    for (let i = 1; i < entities.length; ++i) {
      const e = entities[i]
      if (e.model) {
        if (
          !e.rendermode ||
          e.rendermode == RenderMode.Normal ||
          e.rendermode == RenderMode.Solid
        ) {
          if (e.model[0] === '*') {
            const model = this.sceneInfo.models[parseInt(e.model.substr(1))]
            if (model.isTransparent) {
              transparentEntities.push(e)
              continue
            }
          } else if (e.model.indexOf('.spr') > -1) {
            transparentEntities.push(e)
            continue
          }

          opaqueEntities.push(e)
        } else if (e.rendermode == RenderMode.Additive) {
          transparentEntities.push(e)
        } else {
          transparentEntities.push(e)
        }
      }
    }

    shader.setOpacity(gl, 1.0)
    this.renderWorldSpawn()
    this.renderOpaqueEntities(camera, opaqueEntities)

    if (transparentEntities.length) {
      gl.depthMask(false)
      this.renderTransparentEntities(transparentEntities, camera)
      gl.depthMask(true)
    }
  }

  private renderWorldSpawn() {
    const model = this.sceneInfo.models[0]
    const gl = this.context.gl

    mat4.identity(this.modelMatrix)
    this.shader.setModelMatrix(gl, this.modelMatrix)

    for (let j = 0; j < model.faces.length; ++j) {
      const face = model.faces[j]
      gl.bindTexture(gl.TEXTURE_2D, this.textures[face.textureIndex].handle)
      gl.drawArrays(gl.TRIANGLES, face.offset / 7, face.length / 7)
    }
  }

  private renderOpaqueEntities(camera: Camera, entities: any[]) {
    const gl = this.context.gl
    const shader = this.shader
    const mmx = this.modelMatrix

    for (let i = 0; i < entities.length; ++i) {
      const entity = entities[i]
      const modelIndex = parseInt(entity.model.substr(1))
      const model = this.sceneInfo.models[modelIndex]
      if (model) {
        const angles = entity.angles || [0, 0, 0]
        const origin = entity.origin
          ? vec3.fromValues(
              entity.origin[0],
              entity.origin[1],
              entity.origin[2]
            )
          : vec3.create()
        vec3.add(origin, origin, model.origin)

        // TODO: this seems to work, but needs further research
        mat4.identity(mmx)
        mat4.translate(mmx, mmx, origin)
        // mat4.rotateY(mmx, mmx, (angles[0] * Math.PI) / 180) // dunno this
        mat4.rotateZ(mmx, mmx, (angles[1] * Math.PI) / 180)
        mat4.rotateX(
          this.modelMatrix,
          this.modelMatrix,
          (angles[2] * Math.PI) / 180
        )
        shader.setModelMatrix(gl, this.modelMatrix)

        for (let j = 0; j < model.faces.length; ++j) {
          const face = model.faces[j]
          gl.bindTexture(gl.TEXTURE_2D, this.textures[face.textureIndex].handle)
          gl.drawArrays(gl.TRIANGLES, face.offset / 7, face.length / 7)
        }
      } else if (entity.model.indexOf('.spr') > -1) {
        const texture = this.textures.find(a => a.name === entity.model)
        const sprite = this.sprites[entity.model]
        if (texture && sprite) {
          const origin = entity.origin
            ? vec3.fromValues(
                entity.origin[0],
                entity.origin[1],
                entity.origin[2]
              )
            : vec3.create()
          const scale = vec3.fromValues(texture.width, 1, texture.height)
          const angles = entity.angles
            ? vec3.fromValues(
                entity.angles[0],
                entity.angles[2],
                entity.angles[1]
              )
            : vec3.create()
          vec3.scale(scale, scale, entity.scale || 1)

          mat4.identity(mmx)
          mat4.translate(mmx, mmx, origin)

          switch (sprite.header.type) {
            case SpriteType.VP_PARALLEL_UPRIGHT: {
              // TODO: incorrect, but will do for now
              mat4.rotateZ(mmx, mmx, camera.rotation[1] + Math.PI / 2)
              break
            }
            case SpriteType.FACING_UPRIGHT: {
              // TODO: fix incorrect
              mat4.rotateZ(mmx, mmx, camera.rotation[1] + Math.PI / 2)
              break
            }
            case SpriteType.VP_PARALLEL: {
              mat4.rotateZ(
                mmx,
                mmx,
                Math.atan2(
                  origin[1] - camera.position[1],
                  origin[0] - camera.position[0]
                ) +
                  Math.PI / 2
              )
              mat4.rotateX(
                mmx,
                mmx,
                Math.atan2(
                  camera.position[2] - origin[2],
                  Math.sqrt(
                    Math.pow(camera.position[0] - origin[0], 2) +
                      Math.pow(camera.position[1] - origin[1], 2)
                  )
                )
              )

              break
            }
            case SpriteType.ORIENTED: {
              mat4.rotateY(mmx, mmx, (angles[0] * Math.PI) / 180 + Math.PI)
              mat4.rotateZ(mmx, mmx, (angles[1] * Math.PI) / 180 + Math.PI)
              mat4.rotateX(mmx, mmx, (angles[2] * Math.PI) / 180 - Math.PI / 2)
              break
            }
            case SpriteType.VP_PARALLEL_ORIENTED: {
              mat4.rotateY(mmx, mmx, (angles[0] * Math.PI) / 180 + Math.PI)
              mat4.rotateZ(mmx, mmx, (angles[1] * Math.PI) / 180 + Math.PI)
              break
            }
            default: {
              throw new Error('Invalid sprite type')
            }
          }

          mat4.scale(mmx, mmx, scale)
          shader.setModelMatrix(gl, mmx)
          shader.setOpacity(gl, (entity.renderamt || 255) / 255)

          const renderMode = entity.rendermode || RenderMode.Normal
          switch (renderMode) {
            case RenderMode.Normal: {
              shader.setOpacity(gl, 1)
              gl.bindTexture(gl.TEXTURE_2D, texture.handle)
              gl.drawArrays(
                gl.TRIANGLES,
                this.sceneInfo.models[this.sceneInfo.models.length - 1].offset /
                  7,
                6
              )
              break
            }
            case RenderMode.Color: {
              // TODO: not properly implemented
              shader.setOpacity(gl, (entity.renderamt || 255) / 255)
              gl.bindTexture(gl.TEXTURE_2D, texture.handle)
              gl.drawArrays(
                gl.TRIANGLES,
                this.sceneInfo.models[this.sceneInfo.models.length - 1].offset /
                  7,
                6
              )
              break
            }
            case RenderMode.Texture: {
              shader.setOpacity(gl, (entity.renderamt || 255) / 255)
              gl.bindTexture(gl.TEXTURE_2D, texture.handle)
              gl.drawArrays(
                gl.TRIANGLES,
                this.sceneInfo.models[this.sceneInfo.models.length - 1].offset /
                  7,
                6
              )
              break
            }
            case RenderMode.Glow: {
              // TODO: not properly implemented
              gl.blendFunc(gl.SRC_ALPHA, gl.DST_ALPHA)
              shader.setOpacity(gl, (entity.renderamt || 255) / 255)
              gl.bindTexture(gl.TEXTURE_2D, texture.handle)
              gl.drawArrays(
                gl.TRIANGLES,
                this.sceneInfo.models[this.sceneInfo.models.length - 1].offset /
                  7,
                6
              )
              gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
              break
            }
            case RenderMode.Solid: {
              // TODO: not properly implemented
              shader.setOpacity(gl, (entity.renderamt || 255) / 255)
              gl.bindTexture(gl.TEXTURE_2D, texture.handle)
              gl.drawArrays(
                gl.TRIANGLES,
                this.sceneInfo.models[this.sceneInfo.models.length - 1].offset /
                  7,
                6
              )
              break
            }
            case RenderMode.Additive: {
              gl.blendFunc(gl.SRC_ALPHA, gl.DST_ALPHA)
              shader.setOpacity(gl, (entity.renderamt || 255) / 255)
              gl.bindTexture(gl.TEXTURE_2D, texture.handle)
              gl.drawArrays(
                gl.TRIANGLES,
                this.sceneInfo.models[this.sceneInfo.models.length - 1].offset /
                  7,
                6
              )
              gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
              break
            }
          }
        }
      }
    }
  }

  private renderTransparentEntities(entities: any[], camera: Camera) {
    const gl = this.context.gl
    const shader = this.shader
    const mmx = this.modelMatrix

    // distances of all entities from the camera
    const entityDistances: {
      index: number
      distance: number
    }[] = entities
      .map((e, i) => ({
        index: i,
        distance: vec3.dist(camera.position, e.origin || [0, 0, 0])
      }))
      .sort((a, b) => a.distance - b.distance)

    for (let i = 0; i < entityDistances.length; ++i) {
      const entity = entities[entityDistances[i].index]

      const modelIndex = parseInt(entity.model.substr(1))
      const model = this.sceneInfo.models[modelIndex]
      if (model) {
        const angles = entity.angles || [0, 0, 0]
        const origin = entity.origin || [0, 0, 0]
        origin[0] += model.origin[0]
        origin[1] += model.origin[1]
        origin[2] += model.origin[2]

        // TODO: this seems to work, but needs further research
        mat4.identity(mmx)
        mat4.translate(mmx, mmx, origin)
        mat4.rotateZ(mmx, mmx, (angles[1] * Math.PI) / 180)
        // mat4.rotateY(mmx, mmx, (angles[2] * Math.PI) / 180) // dunno this
        mat4.rotateX(
          this.modelMatrix,
          this.modelMatrix,
          (angles[2] * Math.PI) / 180
        )
        shader.setModelMatrix(gl, this.modelMatrix)

        const renderMode = entity.rendermode || RenderMode.Normal
        switch (renderMode) {
          case RenderMode.Normal: {
            shader.setOpacity(gl, 1)
            for (let j = 0; j < model.faces.length; ++j) {
              const face = model.faces[j]
              gl.bindTexture(
                gl.TEXTURE_2D,
                this.textures[face.textureIndex].handle
              )
              gl.drawArrays(gl.TRIANGLES, face.offset / 7, face.length / 7)
            }
            break
          }
          case RenderMode.Color: {
            // TODO: not properly implemented
            shader.setOpacity(gl, (entity.renderamt || 255) / 255)
            for (let j = 0; j < model.faces.length; ++j) {
              const face = model.faces[j]
              gl.bindTexture(
                gl.TEXTURE_2D,
                this.textures[face.textureIndex].handle
              )
              gl.drawArrays(gl.TRIANGLES, face.offset / 7, face.length / 7)
            }
            break
          }
          case RenderMode.Texture: {
            shader.setOpacity(gl, (entity.renderamt || 255) / 255)
            for (let j = 0; j < model.faces.length; ++j) {
              const face = model.faces[j]
              gl.bindTexture(
                gl.TEXTURE_2D,
                this.textures[face.textureIndex].handle
              )
              gl.drawArrays(gl.TRIANGLES, face.offset / 7, face.length / 7)
            }
            break
          }
          case RenderMode.Glow: {
            // TODO: not properly implemented
            shader.setOpacity(gl, (entity.renderamt || 255) / 255)
            for (let j = 0; j < model.faces.length; ++j) {
              const face = model.faces[j]
              gl.bindTexture(
                gl.TEXTURE_2D,
                this.textures[face.textureIndex].handle
              )
              gl.drawArrays(gl.TRIANGLES, face.offset / 7, face.length / 7)
            }
            break
          }
          case RenderMode.Solid: {
            // TODO: not properly implemented
            shader.setOpacity(gl, (entity.renderamt || 255) / 255)
            for (let j = 0; j < model.faces.length; ++j) {
              const face = model.faces[j]
              gl.bindTexture(
                gl.TEXTURE_2D,
                this.textures[face.textureIndex].handle
              )
              gl.drawArrays(gl.TRIANGLES, face.offset / 7, face.length / 7)
            }
            break
          }
          case RenderMode.Additive: {
            gl.blendFunc(gl.SRC_ALPHA, gl.DST_ALPHA)
            shader.setOpacity(gl, (entity.renderamt || 255) / 255)
            for (let j = 0; j < model.faces.length; ++j) {
              const face = model.faces[j]
              gl.bindTexture(
                gl.TEXTURE_2D,
                this.textures[face.textureIndex].handle
              )
              gl.drawArrays(gl.TRIANGLES, face.offset / 7, face.length / 7)
            }
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
            break
          }
        }
      } else if (entity.model.indexOf('.spr') > -1) {
        const texture = this.textures.find(a => a.name === entity.model)
        const sprite = this.sprites[entity.model]
        if (texture && sprite) {
          const origin = entity.origin
            ? vec3.fromValues(
                entity.origin[0],
                entity.origin[1],
                entity.origin[2]
              )
            : vec3.create()
          const scale = vec3.fromValues(texture.width, 1, texture.height)
          const angles = entity.angles
            ? vec3.fromValues(
                entity.angles[0],
                entity.angles[2],
                entity.angles[1]
              )
            : vec3.create()
          vec3.scale(scale, scale, entity.scale || 1)

          mat4.identity(mmx)
          mat4.translate(mmx, mmx, origin)

          switch (sprite.header.type) {
            case SpriteType.VP_PARALLEL_UPRIGHT: {
              // TODO: incorrect, but will do for now
              mat4.rotateZ(mmx, mmx, camera.rotation[1] + Math.PI / 2)
              break
            }
            case SpriteType.FACING_UPRIGHT: {
              // TODO: fix incorrect
              mat4.rotateZ(mmx, mmx, camera.rotation[1] + Math.PI / 2)
              break
            }
            case SpriteType.VP_PARALLEL: {
              mat4.rotateZ(
                mmx,
                mmx,
                Math.atan2(
                  origin[1] - camera.position[1],
                  origin[0] - camera.position[0]
                ) +
                  Math.PI / 2
              )
              mat4.rotateX(
                mmx,
                mmx,
                Math.atan2(
                  camera.position[2] - origin[2],
                  Math.sqrt(
                    Math.pow(camera.position[0] - origin[0], 2) +
                      Math.pow(camera.position[1] - origin[1], 2)
                  )
                )
              )

              break
            }
            case SpriteType.ORIENTED: {
              mat4.rotateY(mmx, mmx, (angles[0] * Math.PI) / 180 + Math.PI)
              mat4.rotateZ(mmx, mmx, (angles[1] * Math.PI) / 180 + Math.PI)
              mat4.rotateX(mmx, mmx, (angles[2] * Math.PI) / 180 - Math.PI / 2)
              break
            }
            case SpriteType.VP_PARALLEL_ORIENTED: {
              mat4.rotateY(mmx, mmx, (angles[0] * Math.PI) / 180 + Math.PI)
              mat4.rotateZ(mmx, mmx, (angles[1] * Math.PI) / 180 + Math.PI)
              break
            }
            default: {
              throw new Error('Invalid sprite type')
            }
          }

          mat4.scale(mmx, mmx, scale)
          shader.setModelMatrix(gl, mmx)
          shader.setOpacity(gl, (entity.renderamt || 255) / 255)

          const renderMode = entity.rendermode || RenderMode.Normal
          switch (renderMode) {
            case RenderMode.Normal: {
              shader.setOpacity(gl, 1)
              gl.bindTexture(gl.TEXTURE_2D, texture.handle)
              gl.drawArrays(
                gl.TRIANGLES,
                this.sceneInfo.models[this.sceneInfo.models.length - 1].offset /
                  7,
                6
              )
              break
            }
            case RenderMode.Color: {
              // TODO: not properly implemented
              shader.setOpacity(gl, (entity.renderamt || 255) / 255)
              gl.bindTexture(gl.TEXTURE_2D, texture.handle)
              gl.drawArrays(
                gl.TRIANGLES,
                this.sceneInfo.models[this.sceneInfo.models.length - 1].offset /
                  7,
                6
              )
              break
            }
            case RenderMode.Texture: {
              shader.setOpacity(gl, (entity.renderamt || 255) / 255)
              gl.bindTexture(gl.TEXTURE_2D, texture.handle)
              gl.drawArrays(
                gl.TRIANGLES,
                this.sceneInfo.models[this.sceneInfo.models.length - 1].offset /
                  7,
                6
              )
              break
            }
            case RenderMode.Glow: {
              // TODO: not properly implemented
              gl.blendFunc(gl.SRC_ALPHA, gl.DST_ALPHA)
              shader.setOpacity(gl, (entity.renderamt || 255) / 255)
              gl.bindTexture(gl.TEXTURE_2D, texture.handle)
              gl.drawArrays(
                gl.TRIANGLES,
                this.sceneInfo.models[this.sceneInfo.models.length - 1].offset /
                  7,
                6
              )
              gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
              break
            }
            case RenderMode.Solid: {
              // TODO: not properly implemented
              shader.setOpacity(gl, (entity.renderamt || 255) / 255)
              gl.bindTexture(gl.TEXTURE_2D, texture.handle)
              gl.drawArrays(
                gl.TRIANGLES,
                this.sceneInfo.models[this.sceneInfo.models.length - 1].offset /
                  7,
                6
              )
              break
            }
            case RenderMode.Additive: {
              gl.blendFunc(gl.SRC_ALPHA, gl.DST_ALPHA)
              shader.setOpacity(gl, (entity.renderamt || 255) / 255)
              gl.bindTexture(gl.TEXTURE_2D, texture.handle)
              gl.drawArrays(
                gl.TRIANGLES,
                this.sceneInfo.models[this.sceneInfo.models.length - 1].offset /
                  7,
                6
              )
              gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
              break
            }
          }
        }
      }
    }
  }
}
