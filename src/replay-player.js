import EventEmitter from 'events'
import Replay, {ReplayState} from './replay'

const updateGame = (game, state) => {
    game.camera.position.x = state.cameraPos[0]
    game.camera.position.y = state.cameraPos[1]
    game.camera.position.z = state.cameraPos[2]
    game.camera.rotation.x = (90 - state.cameraRot[0]) * 0.0174
    game.camera.rotation.z = (0.0174 * state.cameraRot[1]) - 1.57
}

export default class ReplayPlayer {
    constructor(game) {
        this.reset()
        this.game = game
        this.state = new ReplayState()
        this.replay = null
        this.events = new EventEmitter()
    }

    reset() {
        this.currentMap = 0
        this.currentChunk = 0
        this.currentTime = 0
        this.currentTick = 0

        this.isPlaying = false
        this.isPaused = false
        this.speed = 1

        if (this.replay) {
            let firstChunk = this.replay.maps[0].chunks[0]
            firstChunk.reader.seek(0)
            this.state = firstChunk.state.clone()
        }
    }

    changeReplay(replay) {
        this.replay = replay
        this.reset()
    }

    play() {
        if (!this.isPlaying) {
            this.reset()
            this.isPlaying = true
        } else if (this.isPaused) {
            this.isPaused = false
        }

        this.events.emit('play')
    }

    pause() {
        if (this.isPlaying) {
            this.isPaused = true
        }
        
        this.events.emit('pause')
    }

    stop() {
        this.reset()
        this.events.emit('stop')
    }

    speedUp() {
        this.speed = Math.min(this.speed * 2, 4)
    }

    speedDown() {
        this.speed = Math.max(this.speed / 2, 0.25)
    }

    seek(value) {
        let t = Math.max(0, Math.min(this.replay.length, value))

        let maps = this.replay.maps
        for (let i = 0; i < maps.length; ++i) {
            let chunks = maps[i].chunks
            for (let j = 0; j < chunks.length; ++j) {
                let chunk = chunks[j]
                if ((t >= chunk.startTime) && (t < (chunk.startTime + chunk.timeLength))) {
                    this.currentMap = i
                    this.currentChunk = j
                    this.currentTime = t

                    this.state = chunk.state.clone()
                    let deltaDecoders = this.replay.deltaDecoders
                    let customMessages = this.replay.customMessages
                    let r = chunk.reader
                    r.seek(0)
                    while (true) {
                        let offset = r.tell()
                        let frame = Replay.readFrame(r, deltaDecoders, customMessages)
                        if (frame.time <= t) {
                            this.state.feedFrame(frame)
                            this.currentTick = frame.tick
                        } else {
                            r.seek(offset)
                            break
                        }
                    }

                    updateGame(this.game, this.state)

                    return
                }
            }
        }
    }

    seekByPercent(value) {
        value = Math.max(0, Math.min(value, 100)) / 100
        value *= this.replay.length
        this.seek(value)
    }

    update(dt) {
        if (!this.isPlaying || this.isPaused) {
            return
        }

        let deltaDecoders = this.replay.deltaDecoders
        let customMessages = this.replay.customMessages

        let map = this.replay.maps[this.currentMap]
        let chunk = map.chunks[this.currentChunk]
        let r = chunk.reader
        
        let endTime = this.currentTime + (dt * this.speed)

        let hitStop = false

        while (true) {
            let offset = r.tell()
            if (offset >= chunk.data.length) {
                if (this.currentChunk === (map.chunks.length - 1)) {
                    if (this.currentMap === (this.replay.maps.length - 1)) {
                        hitStop = true
                        break
                    } else {
                        this.currentChunk = 0
                        this.currentMap++
                        map = this.replay.maps[this.currentMap]
                        chunk = map.chunks[this.currentChunk]
                    }
                } else {
                    this.currentChunk++
                    chunk = map.chunks[this.currentChunk]
                }

                r = chunk.reader
                r.seek(0)
                offset = 0

                continue
            }

            let frame = Replay.readFrame(r, deltaDecoders, customMessages)
            if (frame.type < 2) {
                for (let i = 0; i < frame.data.length; ++i) {
                    let message = frame.data[i]
                    if (message.type === 6) { // TODO: Magic number SVC_SOUND
                        let msgSound = message.data
                        let sound = this.game.sounds
                            .find(s => s.index === msgSound.soundIndex)
                        if (sound && sound.name !== 'common/null.wav') {
                            let channel = msgSound.channel
                            let volume = msgSound.volume
                            // TODO: Positional audio
                            this.game.soundSystem.play(sound, channel, volume)
                        }
                    } else if (message.type === 29) { // TODO: Magic number
                        let msgSound = message.data
                        let sound = this.game.sounds
                            .find(s => s.index === msgSound.soundIndex)
                        if (sound && sound.name !== 'common/null.wav') {
                            // TODO: Use after implementing positional audio
                            // let volume = msgSound.volume
                            // this.game.soundSystem.play(sound, 6, volume)
                        }
                    } else if (message.type === 9) {
                        message.data.commands.forEach(command => {
                            switch (command.func) {
                                case 'speak':
                                case 'spk':
                                case 'play': {
                                    let soundName = command.params[0] + '.wav'
                                    let sound = this.game.sounds
                                        .find(s => s.name === soundName)
                                    if (!sound) return

                                    this.game.soundSystem.play(sound, 1, 0.7)
                                    break
                                }
                                case 'playvol': {
                                    let soundName = command.params[0] + '.wav'
                                    let volume
                                    if (isNaN(command.params[1])) {
                                        volume = 1
                                    } else {
                                        volume = Number.parseFloat(command.params[1])
                                    }
                                    let sound = this.game.sounds
                                        .find(s => s.name === soundName)
                                    if (!sound) return

                                    this.game.soundSystem.play(sound, 1, volume)
                                    break
                                }
                            }
                        })
                    }
                }
            } else if (frame.type === 8) {
                let sample = frame.sound.sample
                let sound = this.game.sounds.find(s => s.name === sample)
                if (sound && sound.name !== 'common/null.wav') {
                    let channel = frame.sound.channel
                    let volume = frame.sound.volume
                    this.game.soundSystem.play(sound, channel, volume)
                }
            }
            if (frame.time <= endTime) {
                this.state.feedFrame(frame)
                this.currentTick = frame.tick
            } else {
                r.seek(offset)
                break
            }
        }

        updateGame(this.game, this.state)

        this.currentTime = endTime

        if (hitStop) {
            this.stop()
        }
    }
}