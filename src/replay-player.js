import EventEmitter from 'events'
import * as Time from './time'

export default class ReplayPlayer {
    constructor(data) {
        this.frames = data.frames
        this.beginningTime = data.meta.beginningTime
        this.timeLength = data.meta.timeLength
        this.currentTime = data.frames[0].time
        this.currentFrame = 0

        this.isPlaying = false
        this.isPaused = false

        this.events = new EventEmitter()
    }

    getFrameByTime(time) {
        if (time >= this.frames[this.currentFrame].time) {
            for (let i = this.currentFrame; i < this.frames.length; ++i) {
                if (this.frames[i].time > time) {
                    this.currentFrame = i
                    let left = Math.max(0, i - 1)
                    let right = i

                    return {
                        position: this.frames[left].position, // TODO: interp
                        rotation: this.frames[left].rotation, // TODO: interp
                        command: this.frames[left].commands
                    }
                }
            }
        } else {
            for (let i = this.currentFrame; i >= 0; --i) {
                if (this.frames[i].time <= time) {
                    this.currentFrame = i
                    let left = Math.max(0, i)
                    let right = i

                    return {
                        position: this.frames[left].position, // TODO: interp
                        rotation: this.frames[left].rotation, // TODO: interp
                        command: this.frames[left].commands
                    }
                }
            }
        }

        return null
    }

    play() {
        if (this.isPlaying) {
            this.isPaused = !this.isPaused
        } else {
            this.isPlaying = true
            this.isPaused = false
            this.currentTime = this.beginningTime
        }

        this.events.emit('play')
    }

    update(time) {
        if (!this.isPaused) {
            this.currentTime += time
        }
    }

    stop() {
        this.isPlaying = false
        this.isPaused = false
        this.currentTime = 0

        this.events.emit('stop')
    }

    seekByTime(value) {
        this.currentTime = Math.min(this.timeLength, value)
        this.currentTime = Math.max(this.beginningTime, this.currentTime)
    }

    seekByPercent(value) {
        value = Math.max(0, Math.min(value, 100)) / 100
        value *= this.timeLength - this.beginningTime
        this.seekByTime(value)
    }

    getFrame() {
        let frame = this.getFrameByTime(this.currentTime)
        if (!frame) {
            this.stop()
        }

        return frame
    }

    static createFromReplay(replay) {
        let frames = []

        for (let i = 0; i < replay.directories.length; ++i) {
            if (replay.directories[i].name !== 'Playback') {
                continue
            }

            let macros = replay.directories[i].macros
            macros.forEach(macro => {
                let frame
                if (frames.length && frames[frames.length - 1].id === macro.frame) {
                    frame = frames[frames.length - 1]
                } else {
                    frame = {
                        id: macro.frame,
                        time: macro.time,
                        position: null,
                        rotation: null,
                        commands: []
                    }
                    frames.push(frame)
                }

                if (macro.type === 0 || macro.type === 1) {
                    frame.position = macro.camera.position
                    frame.rotation = macro.camera.orientation
                } else if (macro.type === 3) {
                    frame.commands.push(macro.command)
                }
            })
        }

        return new ReplayPlayer({
            meta: {
                beginningTime: frames[0].time,
                timeLength: frames[frames.length - 1].time
            },
            frames
        })
    }
}