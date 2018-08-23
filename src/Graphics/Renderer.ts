import { Context } from './Context'

export class Renderer {
  static init(context: Context): Renderer | null {
    const gl = context.gl

    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clearDepth(1.0)
    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)

    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

    gl.enable(gl.CULL_FACE)
    gl.cullFace(gl.FRONT)

    return new Renderer({ context })
  }

  private context: Context

  private constructor(params: { context: Context }) {
    this.context = params.context
  }

  draw = () => {
    const gl = this.context.gl

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
  }
}
