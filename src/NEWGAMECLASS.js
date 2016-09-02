var Time = require('./time.js');

module.exports = (function() {
	function Game() {
	}
	
	Game.prototype.start = function() {
		this._lastTime = Time.now();
		this._accumTime = 0;
		this._stop = false;
		
		// load
		
		this._frame();
	}
	
	Game.prototype.stop = function() {
		this._stop = true;
	}
	
	Game.prototype._frame = function() {
		var currTime = Time.now();
		var deltaTime = currTime - this._lastTime;
		this._accumTime += deltaTime;
		while (this._accumTime > 50) {
			this._update();
			this._accumTime -= 50;
		}
		
		this._draw();
		
		if (!this._stop) {
			requestAnimationFrame(this._frame.bind(this));
		}
		this.lastTime = currTime;
	}
	
	Game.prototype._update = function() {
		
	}
	
	Game.prototype._draw = function() {
		
	}
	
	return Game;
}());