import { SoundSystem } from './SoundSystem'
import { ProgressCallback, xhr } from './Xhr'

class Sound {
  index: number
  name: string
  buffer: AudioBuffer

  constructor(buffer: AudioBuffer) {
    this.index = -1
    this.name = ''
    this.buffer = buffer
  }

  static loadFromUrl(url: string, progressCallback: ProgressCallback) {
    return xhr(url, {
      method: 'GET',
      isBinary: true,
      progressCallback
    }).then(
      response =>
        new Promise<Sound>((resolve, reject) => {
          SoundSystem.getContext().decodeAudioData(
            response,
            (buffer: AudioBuffer) => {
              resolve(new Sound(buffer))
            },
            (err: any) => {
              reject(err)
            }
          )
        })
    )
  }
}

export { Sound }
