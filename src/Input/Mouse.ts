import vec2 = require('gl-matrix/cjs/vec2')

export class Mouse {
  click: boolean = false
  leftClick: boolean = false
  rightClick: boolean = false
  position: vec2 = vec2.create()
  delta: vec2 = vec2.create()
}
