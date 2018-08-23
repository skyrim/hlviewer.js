import { SoundSystem } from './SoundSystem'

export class Sound {
  index: number
  name: string
  buffer: AudioBuffer

  constructor(buffer: AudioBuffer) {
    this.index = -1
    this.name = ''
    this.buffer = buffer
  }

  static create(buffer: ArrayBuffer): Promise<Sound> {
    return new Promise<Sound>((resolve, reject) => {
      SoundSystem.getContext().decodeAudioData(
        buffer,
        (buffer: AudioBuffer) => {
          resolve(new Sound(buffer))
        },
        (err: any) => {
          reject(err)
        }
      )
    })
  }
}
