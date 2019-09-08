import { Bsp } from '../Bsp'
import { Tga } from '../Parsers/Tga'
import { Camera } from './Camera'
import { Context } from './Context'
import { SkyShader } from './SkyShader/SkyShader'

export class SkyScene {
  static init(context: Context): SkyScene | null {
    const shader = SkyShader.init(context)
    if (!shader) {
      console.error("skyscenen't")
      return null
    }

    return new SkyScene({ context, shader })
  }

  private context: Context
  private shader: SkyShader
  private vertexBuffer: WebGLBuffer | null = null
  private indexBuffer: WebGLBuffer | null = null
  private texture: WebGLTexture | null = null
  private isReady: boolean = false

  private constructor(params: { context: Context; shader: SkyShader }) {
    this.context = params.context
    this.shader = params.shader
  }

  changeMap(bsp: Bsp) {
    if (bsp.skies.length !== 6) {
      this.isReady = false
      return
    }

    const gl = this.context.gl
    const vertexBuffer = gl.createBuffer()
    const indexBuffer = gl.createBuffer()
    const texture = gl.createTexture()
    if (!vertexBuffer || !indexBuffer || !texture) {
      // TODO
      throw new Error('shouldnt happen')
    }

    // prettier-ignore
    const indices = new Uint8Array([
      0,  1,  2,      0,  2,  3,    // front
      4,  5,  6,      4,  6,  7,    // back
      8,  9,  10,     8,  10, 11,   // top
      12, 13, 14,     12, 14, 15,   // bottom
      16, 17, 18,     16, 18, 19,   // right
      20, 21, 22,     20, 22, 23,   // left
    ])
    // prettier-ignore
    const vertices = new Float32Array([
      // Top face
      -1.0, -1.0,  1.0, 0.499, 0.001,
       1.0, -1.0,  1.0, 0.499, 0.249,
       1.0,  1.0,  1.0, 0.001, 0.249,
      -1.0,  1.0,  1.0, 0.001, 0.001,

      // Bottom face
      -1.0, -1.0, -1.0, 0.499, 0.749,
      -1.0,  1.0, -1.0, 0.001, 0.749,
       1.0,  1.0, -1.0, 0.001, 0.501,
       1.0, -1.0, -1.0, 0.499, 0.501,

      // Front face
      -1.0,  1.0, -1.0, 0.501, 0.749,
      -1.0,  1.0,  1.0, 0.501, 0.501,
       1.0,  1.0,  1.0, 0.999, 0.501,
       1.0,  1.0, -1.0, 0.999, 0.749,

      // Back face
      -1.0, -1.0, -1.0, 0.999, 0.249,
       1.0, -1.0, -1.0, 0.501, 0.249,
       1.0, -1.0,  1.0, 0.501, 0.001,
      -1.0, -1.0,  1.0, 0.999, 0.001,

      // Right face
       1.0, -1.0, -1.0, 0.499, 0.499,
       1.0,  1.0, -1.0, 0.001, 0.499,
       1.0,  1.0,  1.0, 0.001, 0.251,
       1.0, -1.0,  1.0, 0.499, 0.251,

      // Left face
      -1.0, -1.0, -1.0, 0.501, 0.499,
      -1.0, -1.0,  1.0, 0.501, 0.251,
      -1.0,  1.0,  1.0, 0.999, 0.251,
      -1.0,  1.0, -1.0, 0.999, 0.499
    ].map((a, i) => ((i % 5) < 3) ? a * 4096 : a))

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
    gl.enableVertexAttribArray(0)

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW)

    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 1024
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      throw new Error('sky ctx fail')
    }

    const coords: { [name: string]: number[] } = {
      up: [0, 0],
      rt: [0, 256],
      dn: [0, 512],
      ft: [256, 0],
      lf: [256, 256],
      bk: [256, 512]
    }

    bsp.skies.forEach((sky: Tga) => {
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

    const pixelData = ctx.getImageData(0, 0, 512, 1024).data
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      512,
      1024,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      new Uint8Array(pixelData)
    )
    gl.generateMipmap(gl.TEXTURE_2D)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT)
    gl.texParameteri(
      gl.TEXTURE_2D,
      gl.TEXTURE_MIN_FILTER,
      gl.LINEAR_MIPMAP_LINEAR
    )
    gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    const anisotropy = this.context.getAnisotropyExtension()
    if (anisotropy) {
      gl.texParameteri(
        gl.TEXTURE_2D,
        anisotropy.TEXTURE_MAX_ANISOTROPY_EXT,
        this.context.getMaxAnisotropy(anisotropy)
      )
    }

    this.vertexBuffer = vertexBuffer
    this.indexBuffer = indexBuffer
    this.texture = texture
    this.isReady = true
  }

  draw(camera: Camera) {
    if (!this.isReady) {
      return
    }

    const gl = this.context.gl
    const shader = this.shader

    shader.useProgram(gl)
    gl.bindTexture(gl.TEXTURE_2D, this.texture)
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer)
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer)
    shader.enableVertexAttribs(gl)
    shader.setVertexAttribPointers(gl)
    shader.setDiffuse(gl, 0)

    const x = camera.position[0]
    const y = camera.position[1]
    const z = camera.position[2]
    camera.position[0] = 0
    camera.position[1] = 0
    camera.position[2] = 0
    camera.updateViewMatrix()
    camera.position[0] = x
    camera.position[1] = y
    camera.position[2] = z

    shader.setViewMatrix(gl, camera.viewMatrix)
    shader.setProjectionMatrix(gl, camera.projectionMatrix)

    gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_BYTE, 0)
    gl.clear(gl.DEPTH_BUFFER_BIT)
  }
}
