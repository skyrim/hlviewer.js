import { vec2 } from 'gl-matrix'

export class Touch {
  pressed: boolean = false
  position: vec2 = vec2.create()
  delta: vec2 = vec2.create()
}
