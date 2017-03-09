import { Vector2 } from './vector'

class Mouse {
    click: boolean
    leftClick: boolean
    rightClick: boolean
    position: Vector2
    delta: Vector2

    constructor() {
        this.click = false
        this.leftClick = false
        this.rightClick = false
        this.position = new Vector2()
        this.delta = new Vector2()
    }
}

export { Mouse }
