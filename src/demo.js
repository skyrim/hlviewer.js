module.exports = (function () {
    'use strict';

    var Demo = function (file) {
        this.status = -1;
        this.currentDirectory = -1;
        this.file = file;
        this.parseDemo(file);
    };

    Demo.Controller = function () {
        this.demo = null;
        this.started = false;
        this.paused = false;
        this.startTime = 0.0;
        this.pauseTime = 0.0;
    };

    Demo.Controller.prototype.load = function (demo) {
        this.demo = demo;
        this.started = false;
        this.paused = false;
        this.startTime = 0.0;
        this.pauseTime = 0.0;
        this.length = demo.directory.entries[1].time;
    };

    Demo.Controller.prototype.unload = function () {
        this.demo = null;
        this.started = false;
        this.paused = false;
        this.startTime = 0.0;
        this.pauseTime = 0.0;
    };

    Demo.Controller.prototype.play = function () {
        if (this.demo === null) {
            console.error('Demo not loaded');
            return;
        }

        var currentTime = (new Date()).getTime();
        if (this.started === true) {
            if (this.paused === true) {
                // unpause
                this.paused = false;
                this.startTime += currentTime - this.pauseTime;
            }
            else {
                // pause
                this.paused = true;
                this.pauseTime = currentTime;
            }
        }
        else {
            // start
            this.started = true;
            this.paused = false;
            this.startTime = currentTime;
            this.demo.playDirectory(1);
        }
    };

    Demo.Controller.prototype.stop = function () {
        this.started = false;
        this.paused = false;
        this.startTime = 0.0;
        this.pauseTime = 0.0;
    };

    Demo.Controller.prototype.seekPercent = function (percent) {
        if (this.paused) {
            return;
        }

        var length = this.demo.directory.entries[1].time;
        this.startTime = (new Date()).getTime() - ( length * 1000 * percent );
        this.demo.playDirectory(1);
    };

    Demo.prototype.parseDemo = function (file) {
        var magic = file.readString(8);
        if (magic !== "HLDEMO") {
            this.status = 0;
            return;
        }

        this.status = 1;

        this.header = {};
        this.header.demoProtocol = file.readInt();
        this.header.networkProtocol = file.readInt();
        this.header.mapName = file.readString(260);
        this.header.modName = file.readString(260);
        this.header.mapCrc = file.readInt();
        this.header.directoryOffset = file.readInt();

        file.seek(this.header.directoryOffset);
        this.directory = {};
        this.directory.count = file.readInt();
        this.directory.entries = new Array(this.directory.count);
        for (var i = 0; i < this.directory.count; ++i) {
            this.directory.entries[i] = {};
            this.directory.entries[i].id = file.readInt();
            this.directory.entries[i].name = file.readString(64);
            this.directory.entries[i].flags = file.readInt();
            this.directory.entries[i].cdTrack = file.readInt();
            this.directory.entries[i].time = file.readFloat();
            this.directory.entries[i].frames = file.readInt();
            this.directory.entries[i].offset = file.readInt();
            this.directory.entries[i].length = file.readInt();
        }
        file.seek(this.directory.entries[0].offset);

        if (this.callback) {
            this.callback();
        }
    };

    Demo.prototype.isTimeForNextMacro = function (time) {
        if (this.endOfDirectory()) {
            return false;
        }

        var file = this.file;

        file.skip(1);
        var macroTime = file.readFloat();
        file.skip(-5);

        return ( time >= macroTime );
    };

    Demo.prototype.getMacro = function () {
        var file = this.file;
        var macro = {};
        macro.id = file.readByte();
        //this.lastMacro = macro.id;
        macro.time = file.readFloat();
        macro.frame = file.readInt();
        switch (macro.id) {
            case 0:
            case 1:
                file.skip(4);
                macro.camera = {};
                macro.camera.position = [file.readFloat(), file.readFloat(), file.readFloat()];
                macro.camera.orientation = [file.readFloat(), file.readFloat(), file.readFloat()];
                file.skip(436);
                file.skip(file.readInt());
                break;

            case 2:
                // beginning of playback directory entry
                break;

            case 3:
                macro.command = file.readString(64);
                //file.skip( 64 ); // command
                break;

            case 4:
                macro.camera = {};
                macro.camera.origin = [file.readFloat(), file.readFloat(), file.readFloat()];
                macro.camera.orientation = [file.readFloat(), file.readFloat(), file.readFloat()];
                file.skip(8);
                break;

            case 5:
                // end of directory entry
                break;

            case 6:
                file.skip(84);
                break;

            case 7:
                file.skip(8);
                break;

            case 8:
                file.skip(4);
                file.skip(file.readInt() + 16);
                break;

            case 9:
                file.skip(file.readInt());
                break;
            default:
                console.error("Unknown demo macro: %d", macro.id);
                break;
        }

        return macro;
    };

    Demo.prototype.endOfDirectory = function () {
        if (this.currentDirectory < 0 || this.currentDirectory > this.directory.entries.length) {
            throw "No demo directory has started playing.";
        }

        var dirEntry = this.directory.entries[this.currentDirectory];
        return this.file.offset >= dirEntry.offset + dirEntry.length;
    };

    Demo.prototype.playDirectory = function (i) {
        if (i < 0 || i > this.directory.entries.length) {
            throw "Invalid directory index.";
        }

        this.file.seek(this.directory.entries[i].offset);
        this.currentDirectory = i;
    };

    Demo.prototype.findDirectoryByName = function (name) {
        for (var i = 0; i < this.directory.entries.length; ++i) {
            if (this.directory.entries[i].name === name) {
                return i;
            }
        }

        return -1;
    };

    return Demo;
}());