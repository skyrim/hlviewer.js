import { Context } from './Context'
import { Texture } from './Texture'

const GL = window.WebGLRenderingContext

export enum TextureWrap {
  repeat = GL.REPEAT,
  mirroredRepeat = GL.MIRRORED_REPEAT,
  clampToEdge = GL.CLAMP_TO_EDGE
}

export enum TextureMinFilter {
  nearest = GL.NEAREST,
  linear = GL.LINEAR,
  nearestMipmapNearest = GL.NEAREST_MIPMAP_NEAREST,
  linearMipmapNearest = GL.LINEAR_MIPMAP_NEAREST,
  nearestMipmapLinear = GL.NEAREST_MIPMAP_LINEAR,
  linearMipmapLinear = GL.LINEAR_MIPMAP_LINEAR
}

export enum TextureMagFilter {
  nearest = GL.NEAREST,
  linear = GL.LINEAR
}

type TextureExtraParams = {
  unpackPremultiplyAlpha?: boolean
  wrapS?: TextureWrap
  wrapT?: TextureWrap
  minFilter?: TextureMinFilter
  magFilter?: TextureMagFilter
  anisotropy?: number
  generateMipmap?: boolean
}

export class GLTexture {
  public static create(
    context: Context,
    texture: Texture,
    params: TextureExtraParams = {}
  ): GLTexture | null {
    const gl = context.gl

    const tex = gl.createTexture()
    if (!tex) {
      console.log('Failed to create WebGL texture during initialization')
      return null
    }

    gl.bindTexture(gl.TEXTURE_2D, tex)
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

    // TODO: why does this generate a warning?
    // const premulAlpha =
    //   params.unpackPremultiplyAlpha !== undefined
    //     ? params.unpackPremultiplyAlpha
    //     : true
    // gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, premulAlpha)

    const wrapS = params.wrapS || TextureWrap.clampToEdge
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapS)

    const wrapT = params.wrapT || TextureWrap.clampToEdge
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapT)

    const minFilter = params.minFilter || TextureMinFilter.linear
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minFilter)

    const magFilter = params.magFilter || TextureMagFilter.linear
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magFilter)

    if (params.anisotropy) {
      const afExt = context.getAnisotropyExtension()
      if (afExt) {
        const maxAf = context.getMaxAnisotropy(afExt)
        const a = Math.max(1, Math.min(params.anisotropy, maxAf))
        gl.texParameteri(gl.TEXTURE_2D, afExt.TEXTURE_MAX_ANISOTROPY_EXT, a)
      }
    }

    const generateMipmap =
      params.generateMipmap === undefined ? true : params.generateMipmap
    if (generateMipmap) {
      gl.generateMipmap(gl.TEXTURE_2D)
    }

    return new GLTexture(texture.name, texture.width, texture.height, tex)
  }

  private name: string
  private width: number
  private height: number
  private texture: WebGLTexture

  private constructor(
    name: string,
    width: number,
    height: number,
    texture: WebGLTexture
  ) {
    this.name = name
    this.width = width
    this.height = height
    this.texture = texture
  }

  getName() {
    return this.name
  }

  getWidth() {
    return this.width
  }

  getHeight() {
    return this.height
  }

  getHandle() {
    return this.texture
  }
}
