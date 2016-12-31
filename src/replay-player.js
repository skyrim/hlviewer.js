export default class ReplayPlayer {
    constructor(data) {
        this.frames = data.frames
        this.beginningTime = data.beginningTime
        this.timeLength = data.timeLength
        this.currentTime = 0
        this.currentFrame = 0
    }

    getFrameByTime(time) {
        if (time > this.currentTime) {
            for (let i = this.currentFrame; i < this.frames.length; ++i) {
                if (this.frames.time[i] > time) {
                    this.currentTime = time
                    this.currentFrame = i
                    let left = Math.ceil(0, i - 1)
                    let right = i

                    return {
                        position: this.frames.position[left], // TODO: interp
                        rotation: this.frames.rotation[left], // TODO: interp
                        command: this.frames.command[left]
                    }
                }
            }
        } else {
            for (let i = this.currentFrame; i >= 0; --i) {
                if (this.frames.time[i] < time) {
                    this.currentTime = time
                    this.currentFrame = i
                    let left = Math.ceil(0, i - 1)
                    let right = i

                    return {
                        position: this.frames.position[left], // TODO: interp
                        rotation: this.frames.rotation[left], // TODO: interp
                        command: this.frames.command[left]
                    }
                }
            }
        }

        return null
    }

    static createFromReplay(replay) {
        // Using structure of arrays instead of array of structures
        // because command are present in few frames
        // and I could save some memory by using sparse array
        // (arrays automatically become sparse when they have many undefined elements)
        // Also, frame lookup by time should be faster (cache hits).
        let frames = {
            time:     [],
            position: [],
            rotation: [],
            command:  [] // <- sparse array
        }

        for (let i = 0; i < replay.directories.length; ++i) {
            let macros = replay.directories[i].macros
            for (let j = 0; j < macros.length; ++i) {
                let macro = macros[i]
                if (macro.type === 0 || macro.type === 1) {
                    frames.time.push(macro.time)
                    frames.position.push(macro.camera.position)
                    frames.position.push(macro.camera.orientation)
                } else if (macro.type === 3) {
                    frames.command[frames.position.length - 1] = macro.command
                }
            }
        }

        return new ReplayPlayer({
            meta: {
                beginningTime: replay.directories[0].macros[0].time,
                timeLength: replay.directories[replay.directories.length - 1].macros.slice(-1)[0].time
            },
            frames
        })
    }
}