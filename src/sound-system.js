const PolyfillAudioContext = (window.AudioContext || window.webkitAudioContext)
const audioContext = new PolyfillAudioContext()

export default class SoundSystem {
    constructor() {
        this.context = new (window.AudioContext || window.webkitAudioContext)()

        this.channels = []

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

    play(sound, channel, volume, attenuation, pitch, position) {
        console.assert(channel > 0 && channel < this.channels.length)

        this.stop(channel)

        let gain = this.channels[channel].gain
        gain.gain.value = Math.max(0, Math.min(1, volume))

        let source = this.context.createBufferSource()
        source.buffer = sound.buffer
        source.connect(gain)
        source.start(0)

        this.channels[channel].source = source
    }

    stop(channel) {
        console.assert(channel > 0 && channel < this.channels.length)

        let source = this.channels[channel].source
        if (source) {
            source.stop(0)
        }
    }

    getVolume() {
        return this.masterGain.gain.value
    }

    setVolume(value) {
        this.masterGain.gain.value = value
    }
}