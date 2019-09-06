import { Vector2 } from '../Vector'

export class Touch {
  pressed: boolean = false
  position: Vector2 = new Vector2()
  delta: Vector2 = new Vector2()
}
