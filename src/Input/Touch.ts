import { vec2 } from 'gl-matrix'

export class Touch {
  pressed = false
  position = vec2.create()
  delta = vec2.create()
}
