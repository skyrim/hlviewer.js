import { Context, Program } from '../Context'
import { mat4 } from 'gl-matrix'

export class MainShader {
  static init(context: Context): MainShader | null {
    const vertexShaderSrc = require('./shader-vertex.glsl')
    const fragmentShaderSrc = require('./shader-fragment.glsl')

    const attributeNames = [
      'position',
      'texCoord',
      'texCoord2'
    ]
    const uniformNames: string[] = [
      'modelMatrix',
      'viewMatrix',
      'projectionMatrix',
      'diffuse',
      'lightmap',
      'opacity'
    ]
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

    return new MainShader(program)
  }

  private program: WebGLProgram
  private aPosition: number
  private aTexCoord: number
  private aTexCoord2: number
  private uModelMx: WebGLUniformLocation
  private uViewMx: WebGLUniformLocation
  private uProjectionMx: WebGLUniformLocation
  private uDiffuse: WebGLUniformLocation
  private uLightmap: WebGLUniformLocation
  private uOpacity: WebGLUniformLocation

  private constructor(program: Program) {
    this.program = program.handle
    this.aPosition = program.attributes['position']
    this.aTexCoord = program.attributes['texCoord']
    this.aTexCoord2 = program.attributes['texCoord2']
    this.uModelMx = program.uniforms['modelMatrix']
    this.uViewMx = program.uniforms['viewMatrix']
    this.uProjectionMx = program.uniforms['projectionMatrix']
    this.uDiffuse = program.uniforms['diffuse']
    this.uLightmap = program.uniforms['lightmap']
    this.uOpacity = program.uniforms['opacity']
  }

  useProgram(gl: WebGLRenderingContext) {
    gl.useProgram(this.program)
  }

  setModelMatrix(gl: WebGLRenderingContext, matrix: mat4) {
    gl.uniformMatrix4fv(this.uModelMx, false, matrix)
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

  setLightmap(gl: WebGLRenderingContext, val: number) {
    gl.uniform1i(this.uLightmap, val)
  }

  setOpacity(gl: WebGLRenderingContext, val: number) {
    gl.uniform1f(this.uOpacity, val)
  }

  enableVertexAttribs(gl: WebGLRenderingContext) {
    gl.enableVertexAttribArray(this.aPosition)
    gl.enableVertexAttribArray(this.aTexCoord)
    gl.enableVertexAttribArray(this.aTexCoord2)
  }

  setVertexAttribPointers(gl: WebGLRenderingContext) {
    gl.vertexAttribPointer(this.aPosition, 3, gl.FLOAT, false, 7 * 4, 0)
    gl.vertexAttribPointer(this.aTexCoord, 2, gl.FLOAT, false, 7 * 4, 3 * 4)
    gl.vertexAttribPointer(this.aTexCoord2, 2, gl.FLOAT, false, 7 * 4, 5 * 4)
  }
}
