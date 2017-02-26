import SoundSystem from './sound-system'
import xhr from './xhr'

export default class Sound {
    constructor(buffer) {
        this.buffer = buffer
    }

    static loadFromUrl(url, progressCallback) {
        return xhr(url, {
            isBinary: true,
            progressCallback
        })
        .then(response => new Promise((resolve, reject) => {
            SoundSystem.getContext().decodeAudioData(response,
                buffer => {
                    resolve(new Sound(buffer))
                },
                err => {
                    reject(err)
                })
        }))
    }
}