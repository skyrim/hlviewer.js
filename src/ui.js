var $ = require('jquery');
var Game = require('./game.js');

var UI = {};
UI.FADE_DELAY = 300;
UI.Replay = function (replayController) {
    this.controller = replayController;
    this._srcStart = Game.PATH_IMAGES + 'start.png';
    this._srcPause = Game.PATH_IMAGES + 'pause.png';
    this._srcStop = Game.PATH_IMAGES + 'stop.png';

    var width = '30px';
    var height = '30px';

    this.container = document.createElement('div');
    this.container.style.position = 'absolute';
    this.container.style.display = 'none';
    this.container.style.left = '0px';
    this.container.style.right = '0px';
    this.container.style.bottom = '0px';
    this.container.style.background = 'rgba(255, 255, 255, 0.8)';
    this.container.style.borderRadius = '2px';
    this.container.style.padding = '10px 4px 4px 4px';
    this.container.style.height = height;

    this.playButton = document.createElement('img');
    this.playButton.src = this._srcStart;
    this.playButton.style.width = width;
    $(this.playButton).on('click', this._onClickPlay.bind(this));

    this.stopButton = document.createElement('img');
    this.stopButton.src = this._srcStop;
    this.stopButton.style.width = width;
    $(this.stopButton).on('click', this._onClickStop.bind(this));

    this.progressBar = document.createElement('div');
    this.progressBar.style.position = 'absolute';
    this.progressBar.style.top = '0px';
    this.progressBar.style.left = '0px';
    this.progressBar.style.display = 'block';
    this.progressBar.style.width = '100%';
    this.progressBar.style.height = '6px';

    this.progressBarLine = document.createElement('p');
    this.progressBarLine.style.position = 'absolute';
    this.progressBarLine.style.left = '0px';
    this.progressBarLine.style.top = '0px';
    this.progressBarLine.style.background = 'rgba(64, 64, 64, 0.7)';
    this.progressBarLine.style.height = '100%';
    this.progressBarLine.style.width = '0%';
    this.progressBarLine.style.fontSize = '0px';
    this.progressBarLine.innerHTML = '&nbsp';

    this.container.appendChild(this.playButton);
    this.container.appendChild(this.stopButton);
    this.progressBar.appendChild(this.progressBarLine);
    this.container.appendChild(this.progressBar);
    document.body.appendChild(this.container);

    $(this.progressBar).on('click', this._onClickProgressBar.bind(this));

    $(this.container).hover(
        function () {
            $(this).stop().animate({'opacity': 1});
        },
        function () {
            $(this).stop().animate({'opacity': 0});
        }
    );
};
UI.Replay.prototype.toggle = function () {
    $(this.container).fadeToggle(UI.FADE_DELAY);
};
UI.Replay.prototype._onClickPlay = function () {
    this.controller.play();
    this.playButton.src = this.controller.paused ? this._srcStart : this._srcPause;
};
UI.Replay.prototype._onClickStop = function () {
    this.controller.stop();
    this.playButton.src = this._srcStart;
};
UI.Replay.prototype._onClickProgressBar = function (event) {
    var x = event.pageX - $(this.progressBar).offset().left;
    var percent = x / $(this.progressBar).width();
    this.controller.seekPercent(percent);
};
UI.Replay.prototype.show = function () {
    $(this.container).fadeIn(UI.FADE_DELAY);
};
UI.Replay.prototype.hide = function () {
    $(this.container).fadeOut(UI.FADE_DELAY);
};
UI.Replay.prototype.update = function () {
    if (this.controller.started) {
        if (this.controller.paused) {
            this.playButton.src = this._srcStart;
        }
        else {
            this.playButton.src = this._srcPause;
        }
    }
    else {
        this.playButton.src = this._srcStart;
    }

    var progress = 0;
    if (this.controller.paused) {
        progress = ( ( this.controller.pauseTime - this.controller.startTime ) / 1000 ) / this.controller.length * 100;

    }
    else {
        progress = ( ( (new Date()).getTime() - this.controller.startTime ) / 1000 ) / this.controller.length * 100;
    }
    this.progressBarLine.style.width = progress + '%';
};

module.exports = UI;