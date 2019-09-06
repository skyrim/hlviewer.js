import { Vector2 } from '../Vector'

export class Mouse {
  click: boolean = false
  leftClick: boolean = false
  rightClick: boolean = false
  position: Vector2 = new Vector2()
  delta: Vector2 = new Vector2()
}
