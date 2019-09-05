export interface Program {
  handle: WebGLProgram
  attributes: { [name: string]: number }
  uniforms: { [name: string]: WebGLUniformLocation }
}

export enum ShaderType {
  VERTEX,
  FRAGMENT
}

export class Context {
  public static init(canvas: HTMLCanvasElement) {
    const gl = canvas.getContext('webgl', {
      alpha: false
    })
    if (!gl) {
      console.error('Failed to get WebGL context')
      return null
    }
    return new Context(gl)
  }

  public static checkWebGLSupport() {
    const MESSAGES = {
      BAD_BROWSER: 'Your browser does not seem to support WebGL',
      BAD_GPU: 'Your graphics card does not seem to support WebGL'
    }

    const wnd: any = window
    if (!wnd.WebGLRenderingContext) {
      return {
        hasSupport: false,
        message: MESSAGES.BAD_BROWSER
      }
    }

    const c = document.createElement('canvas')
    try {
      const ctx = c.getContext('webgl') || c.getContext('experimental-webgl')
      if (ctx) {
        return {
          hasSupport: true,
          message: ''
        }
      } else {
        return {
          hasSupport: false,
          message: MESSAGES.BAD_GPU
        }
      }
    } catch (e) {
      return {
        hasSupport: false,
        message: MESSAGES.BAD_GPU
      }
    }
  }

  readonly gl: WebGLRenderingContext

  private constructor(gl: WebGLRenderingContext) {
    this.gl = gl
  }

  createProgram(params: {
    vertexShaderSrc: string
    fragmentShaderSrc: string
    attributeNames: string[]
    uniformNames: string[]
  }): Program | null {
    const gl = this.gl
    var program = gl.createProgram()
    if (!program) {
      console.error('Failed to create WebGL program')
      return null
    }

    const vertexShader = this.createShader({
      source: params.vertexShaderSrc,
      type: ShaderType.VERTEX
    })
    if (!vertexShader) {
      console.error('Failed to compile vertex shader')
      return null
    }
    const fragmentShader = this.createShader({
      source: params.fragmentShaderSrc,
      type: ShaderType.FRAGMENT
    })
    if (!fragmentShader) {
      console.error('Failed to compile fragment shader')
      return null
    }

    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    gl.validateProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program)
      gl.deleteShader(vertexShader)
      gl.deleteShader(fragmentShader)

      const reason = gl.getProgramInfoLog(program)
      console.error(`Could not initialize shader: ${reason}`)
      return null
    }

    if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
      gl.deleteProgram(program)
      gl.deleteShader(vertexShader)
      gl.deleteShader(fragmentShader)

      const reason = gl.getProgramInfoLog(program)
      console.error(`Could not initialize shader: ${reason}`)
      return null
    }

    gl.useProgram(program)

    const attributes: { [name: string]: number } = {}
    for (let i = 0; i < params.attributeNames.length; ++i) {
      const name = params.attributeNames[i]
      const attr = gl.getAttribLocation(program, name)
      if (attr === -1) {
        console.error(`gl.getAttribLocation failed for attrib named "${name}"`)
        gl.deleteProgram(program)
        return null
      }
      attributes[name] = attr
    }

    const uniforms: { [name: string]: WebGLUniformLocation } = {}
    for (let i = 0; i < params.uniformNames.length; ++i) {
      const name = params.uniformNames[i]
      const uniform = gl.getUniformLocation(program, name)
      if (uniform === null) {
        console.error(
          `gl.getUniformLocation failed for uniform named "${name}"`
        )
        gl.deleteProgram(program)
        return null
      }
      uniforms[name] = uniform
    }

    return {
      handle: program,
      attributes,
      uniforms
    }
  }

  createShader(params: { source: string; type: ShaderType }) {
    const gl = this.gl
    const shader =
      params.type === ShaderType.VERTEX
        ? gl.createShader(gl.VERTEX_SHADER)
        : gl.createShader(gl.FRAGMENT_SHADER)
    if (!shader) {
      console.error('Failed to create shader program')
      return null
    }
    gl.shaderSource(shader, params.source)
    gl.compileShader(shader)

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(shader))
      gl.deleteShader(shader)
      return null
    }

    return shader
  }

  getAnisotropyExtension(): EXT_texture_filter_anisotropic | null {
    return (
      this.gl.getExtension('EXT_texture_filter_anisotropic') ||
      this.gl.getExtension('MOZ_EXT_texture_filter_anisotropic') ||
      this.gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic')
    )
  }

  getMaxAnisotropy(extension: EXT_texture_filter_anisotropic) {
    return this.gl.getParameter(extension.MAX_TEXTURE_MAX_ANISOTROPY_EXT)
  }
}
