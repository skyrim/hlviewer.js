import vec3 = require('gl-matrix/cjs/vec3')
import mat4 = require('gl-matrix/cjs/mat4')
import glMatrix = require('gl-matrix/cjs/common')

export class Camera {
  static init(aspect: number) {
    return new Camera(aspect)
  }

  projectionMatrix: mat4 = mat4.create()
  aspect: number
  fov: number = glMatrix.toRadian(60)
  near: number = 1.0
  far: number = 8192.0

  viewMatrix: mat4 = mat4.create()
  position = vec3.create()
  rotation = vec3.create()

  private constructor(aspect: number) {
    this.aspect = aspect
    this.updateProjectionMatrix()
  }

  updateProjectionMatrix() {
    mat4.perspective(
      this.projectionMatrix,
      this.fov,
      this.aspect,
      this.near,
      this.far
    )
  }

  updateViewMatrix() {
    mat4.identity(this.viewMatrix)
    mat4.rotateX(
      this.viewMatrix,
      this.viewMatrix,
      this.rotation[0] - Math.PI / 2
    )
    mat4.rotateZ(
      this.viewMatrix,
      this.viewMatrix,
      Math.PI / 2 - this.rotation[1]
    )
    mat4.translate(this.viewMatrix, this.viewMatrix, [
      -this.position[0],
      -this.position[1],
      -this.position[2]
    ])
  }
}
