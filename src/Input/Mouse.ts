import { vec2 } from 'gl-matrix'

export class Mouse {
  click = false
  leftClick = false
  rightClick = false
  position = vec2.create()
  delta = vec2.create()
}
