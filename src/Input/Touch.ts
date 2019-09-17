import vec2 = require('gl-matrix/cjs/vec2')

export class Touch {
  pressed: boolean = false
  position: vec2 = vec2.create()
  delta: vec2 = vec2.create()
}
