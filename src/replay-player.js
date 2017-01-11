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
        this.startTime = 0
        this.pauseTime = 0
    }

    getFrameByTime(time) {
        if (time > this.currentTime) {
            for (let i = this.currentFrame; i < this.frames.length; ++i) {
                if (this.frames[i].time > time) {
                    this.currentTime = time
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
                if (this.frames[i].time < time) {
                    this.currentTime = time
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
        }

        return null
    }

    play() {
        let currentTime = Time.now() / 1000
        if (this.isPlaying) {
            if (this.isPaused) {
                this.isPaused = false
                this.startTime += currentTime - this.pauseTime
            } else {
                this.isPaused = true
                this.pauseTime = currentTime
            }
        } else {
            this.isPlaying = true
            this.isPaused = false
            this.startTime = currentTime
        }
    }

    stop() {
        this.isPlaying = false
        this.isPaused = false
        this.startTime = 0
        this.pauseTime = 0
    }

    getFrame() {
        let currentTime = this.isPaused
            ? this.pauseTime
            : Time.now() / 1000
        let dt = currentTime - this.startTime
        let frame = this.getFrameByTime(this.beginningTime + dt)
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