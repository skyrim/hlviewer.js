import { vec2 } from 'gl-matrix'

export class Mouse {
  click: boolean = false
  leftClick: boolean = false
  rightClick: boolean = false
  position: vec2 = vec2.create()
  delta: vec2 = vec2.create()
}
