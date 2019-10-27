import { Context, Program } from '../Context'

type mat4 = any

const fragmentSrc = `#ifdef GL_ES
precision highp float;
#endif

varying vec2 v_texcoord;

uniform sampler2D u_texture;

void main() {
   gl_FragColor = texture2D(u_texture, v_texcoord);
}`

const vertexSrc = `#ifdef GL_ES
precision highp float;
#endif

attribute vec4 a_position;
attribute vec2 a_texcoord;

uniform mat4 u_matrix;

varying vec2 v_texcoord;

void main() {
  gl_Position = u_matrix * a_position;
  v_texcoord = a_texcoord;
}`

export class GlyphShader {
  static init(context: Context): GlyphShader | null {
    const attributeNames = ['a_position', 'a_texcoord']
    const uniformNames: string[] = ['u_matrix']
    const program = context.createProgram({
      vertexShaderSrc: vertexSrc,
      fragmentShaderSrc: fragmentSrc,
      attributeNames,
      uniformNames
    })
    if (!program) {
      console.error(`Failed to create GlyphShader program`)
      return null
    }

    return new GlyphShader(program)
  }

  private program: WebGLProgram
  private aPosition: number
  private aTexCoord: number
  private uMatrix: WebGLUniformLocation

  private constructor(program: Program) {
    this.program = program.handle
    this.aPosition = program.attributes['a_position']
    this.aTexCoord = program.attributes['a_texcoord']
    this.uMatrix = program.uniforms['u_matrix']
  }

  useProgram(gl: WebGLRenderingContext) {
    gl.useProgram(this.program)
  }

  setMatrix(gl: WebGLRenderingContext, matrix: mat4) {
    gl.uniformMatrix4fv(this.uMatrix, false, matrix)
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
