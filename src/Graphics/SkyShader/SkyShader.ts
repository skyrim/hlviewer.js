import { Context, Program } from '../Context'
import { mat4 } from 'gl-matrix'

export class SkyShader {
  static init(context: Context): SkyShader | null {
    const vertexShaderSrc = require('./shader-vertex.glsl')
    const fragmentShaderSrc = require('./shader-fragment.glsl')

    const attributeNames = ['position', 'texCoord']
    const uniformNames: string[] = ['viewMatrix', 'projectionMatrix', 'diffuse']
    const program = context.createProgram({
      vertexShaderSrc,
      fragmentShaderSrc,
      attributeNames,
      uniformNames
    })
    if (!program) {
      console.log(`programn't`)
      return null
    }

    return new SkyShader(program)
  }

  private program: WebGLProgram
  private aPosition: number
  private aTexCoord: number
  private uViewMx: WebGLUniformLocation
  private uProjectionMx: WebGLUniformLocation
  private uDiffuse: WebGLUniformLocation

  private constructor(program: Program) {
    this.program = program.handle
    this.aPosition = program.attributes['position']
    this.aTexCoord = program.attributes['texCoord']
    this.uViewMx = program.uniforms['viewMatrix']
    this.uProjectionMx = program.uniforms['projectionMatrix']
    this.uDiffuse = program.uniforms['diffuse']
  }

  useProgram(gl: WebGLRenderingContext) {
    gl.useProgram(this.program)
  }

  setViewMatrix(gl: WebGLRenderingContext, matrix: mat4) {
    gl.uniformMatrix4fv(this.uViewMx, false, matrix)
  }

  setProjectionMatrix(gl: WebGLRenderingContext, matrix: mat4) {
    gl.uniformMatrix4fv(this.uProjectionMx, false, matrix)
  }

  setDiffuse(gl: WebGLRenderingContext, value: number) {
    gl.uniform1i(this.uDiffuse, value)
  }

  enableVertexAttribs(gl: WebGLRenderingContext) {
    gl.enableVertexAttribArray(this.aPosition)
    gl.enableVertexAttribArray(this.aTexCoord)
  }

  setVertexAttribPointers(gl: WebGLRenderingContext) {
    gl.vertexAttribPointer(this.aPosition, 3, gl.FLOAT, false, 5 * 4, 0)
    gl.vertexAttribPointer(this.aTexCoord, 2, gl.FLOAT, false, 5 * 4, 3 * 4)
  }
}
