import { EventEmitter } from 'events'
import { Sound } from './sound'

let wnd: any = window

const polyfillAudioContext = (wnd.AudioContext || wnd.webkitAudioContext)
const audioContext = new polyfillAudioContext()

class SoundSystem {
    context: AudioContext
    channels: any[]
    masterGain: GainNode
    preMuteVolume: number
    events: EventEmitter

    constructor() {
        this.context = new (wnd.AudioContext || wnd.webkitAudioContext)()

        this.events = new EventEmitter()

        this.channels = []

        this.preMuteVolume = 1
        this.masterGain = this.context.createGain()
        this.masterGain.gain.value = 1
        this.masterGain.connect(this.context.destination)

        for (let i = 0; i < 8; ++i) {
            this.channels.push({
                source: null,
                gain: this.context.createGain()
            })
            this.channels[i].gain.connect(this.masterGain)
        }
    }

    static getContext() {
        return audioContext
    }

    play(sound: Sound, channel: number, volume: number) {
        this.stop(channel)

        let gain = this.channels[channel].gain
        gain.gain.value = Math.max(0, Math.min(1, volume))

        let source = this.context.createBufferSource()
        source.buffer = sound.buffer
        source.connect(gain)
        source.start(0)

        this.channels[channel].source = source
    }

    stop(channel: number) {
        let source = this.channels[channel].source
        if (source) {
            source.stop(0)
        }
    }

    getVolume() {
        return this.masterGain.gain.value
    }

    setVolume(value: number) {
        let current = this.masterGain.gain.value
        if (current > 0 && value === 0) {
            this.preMuteVolume = current
        }

        this.masterGain.gain.value = value

        this.events.emit('volumeChange', value)
    }

    toggleMute() {
        if (this.getVolume() === 0) {
            this.setVolume(this.preMuteVolume)
        } else {
            this.setVolume(0)
        }
    }
}

export { SoundSystem }
