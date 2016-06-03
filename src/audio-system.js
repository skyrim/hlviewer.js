module.exports = (function() {
    'use strict';

    var AudioSystem = function () {
        this.context = new AudioContext();
        this.sounds = {};
    };

    AudioSystem.prototype.addSound = function (file) {
        var path = file.path;
        var filename = path.split('/').pop();
        this.sounds[filename] = file;
    };

    AudioSystem.prototype.play = function (file) {
        var source = this.context.createBufferSource();
        source.buffer = this.context.createBuffer(file.data, true);
        source.connect(this.context.destination);
        source.start(0);
    };

    return AudioSystem;
}());