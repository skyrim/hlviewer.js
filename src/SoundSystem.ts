import { createNanoEvents, Emitter as EventEmitter } from 'nanoevents'
import { Sound } from './Sound'

const wnd: any = window

const polyfillAudioContext = wnd.AudioContext || wnd.webkitAudioContext
const audioContext: AudioContext = new polyfillAudioContext()

export class SoundSystem {
  context: AudioContext
  channels: any[]
  masterGain: GainNode
  preMuteVolume: number
  events: EventEmitter

  constructor() {
    this.context = audioContext

    this.events = createNanoEvents()

    const volume = parseFloat(localStorage.getItem('volume') || '0.3')
    localStorage.setItem('volume', volume.toString())

    this.channels = []

    this.preMuteVolume = 1
    this.masterGain = this.context.createGain()
    this.masterGain.gain.value = volume
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

    const gain = this.channels[channel].gain
    gain.gain.value = Math.max(0, Math.min(1, volume))

    const source = this.context.createBufferSource()
    source.buffer = sound.buffer
    source.connect(gain)
    source.start(0)

    this.channels[channel].source = source
  }

  stop(channel: number) {
    const source = this.channels[channel].source
    if (source) {
      source.stop(0)
    }
  }

  getVolume() {
    return this.masterGain.gain.value
  }

  setVolume(value: number) {
    const current = this.masterGain.gain.value
    if (current > 0 && value === 0) {
      this.preMuteVolume = current
    }

    this.masterGain.gain.value = value

    localStorage.setItem('volume', value.toString())
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
