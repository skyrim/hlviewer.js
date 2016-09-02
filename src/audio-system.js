'use strict';

/**
 * @constructor
 */
function AudioSystem() {
	this.context = new AudioContext();
	this.sounds = {};
};

/**
 * @param {File} file
 */
AudioSystem.prototype.addSound = function (file) {
	var path = file.path;
	var filename = path.split('/').pop();
	this.sounds[filename] = file;
};

/**
 * @param {File} file
 */
AudioSystem.prototype.play = function (file) {
	var source = this.context.createBufferSource();
	source.buffer = this.context.createBuffer(file.data, true);
	source.connect(this.context.destination);
	source.start(0);
};

module.exports = AudioSystem;