import { Context } from '../Context'

type AtlasParams = {
  pixels: Uint8Array
  width: number
  height: number
  glyphs: {
    x: number
    y: number
    width: number
    height: number
  }[]
}

export class Atlas {
  public static init(context: Context, params: AtlasParams): Atlas | null {
    const gl = context.gl

    const texture = gl.createTexture()
    if (!texture) {
      console.log('Atlas failed to create WebGL texture during initialization')
      return null
    }

    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      params.width,
      params.height,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      params.pixels
    )
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)

    return new Atlas({ ...params, texture })
  }

  private width: number
  private height: number
  private pixels: Uint8Array
  private texture: WebGLTexture
  private glyphs: {
    x: number
    y: number
    width: number
    height: number
  }[]

  private constructor(params: AtlasParams & { texture: WebGLTexture }) {
    this.width = params.width
    this.height = params.height
    this.pixels = params.pixels
    this.texture = params.texture
    this.glyphs = { ...params.glyphs }
  }

  
}
