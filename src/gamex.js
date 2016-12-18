import Time from './time.js'

export default class Game {
	constructor(_window) {
		this.window = _window
		this.isStarted = false
	}

	start() {
		if (this.isStarted) {
			throw new Error('Game already started')
		}
		this.isStarted = true
		this.lastTime = Time.now()
		this.accumTime = 0
		
		this.frame()
	}

	stop() {
		if (this.isStarted) {
			this.isStarted = false
		}
	}

	frame() {
		var currTime = Time.now()
		var deltaTime = currTime - this.lastTime
		this.accumTime += deltaTime
		while (this.accumTime > 50) {
			this.update()
			this.accumTime -= 50 
		}
		
		this.draw()
		
		if (this.isStarted) {
			this.window.requestAnimationFrame(this.frame)
		}
		
		this.lastTime = currTime
	}

	update() {

	}

	draw() {

	}
}