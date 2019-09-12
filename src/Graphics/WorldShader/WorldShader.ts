import { mat4 } from 'gl-matrix'
import { Context, Program } from '../Context'

const fragmentSrc = `#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D diffuse;
uniform sampler2D lightmap;
uniform float opacity;

varying vec2 vTexCoord;
varying vec2 vLightmapCoord;

void main(void) {
  vec4 diffuseColor = texture2D(diffuse, vTexCoord);
  vec4 lightColor = texture2D(lightmap, vLightmapCoord);

  gl_FragColor = vec4(diffuseColor.rgb * lightColor.rgb, diffuseColor.a * opacity);
}`

const vertexSrc = `#ifdef GL_ES
precision highp float;
#endif

attribute vec3 position;
attribute vec2 texCoord;
attribute vec2 texCoord2;

varying vec2 vTexCoord;
varying vec2 vLightmapCoord;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

void main(void) {
  vTexCoord = texCoord;
  vLightmapCoord = texCoord2;

  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1);
}`

export class MainShader {
  static init(context: Context): MainShader | null {
    const attributeNames = ['position', 'texCoord', 'texCoord2']
    const uniformNames: string[] = [
      'modelMatrix',
      'viewMatrix',
      'projectionMatrix',
      'diffuse',
      'lightmap',
      'opacity'
    ]
    const program = context.createProgram({
      vertexShaderSrc: vertexSrc,
      fragmentShaderSrc: fragmentSrc,
      attributeNames,
      uniformNames
    })
    if (!program) {
      console.error('Failed to create MainShader program')
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
