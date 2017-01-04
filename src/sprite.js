import xhr from './xhr'
import Reader from './reader'

/*
sprite header.type
0 = VP_PARALLEL_UPRIGHT,
1 = FACING_UPRIGHT,
2 = VP_PARALLEL,
3 = ORIENTED,
4 = VP_PARALLEL_ORIENTED

sprite header.alphaType
0 = SPR_NORMAL
1 = SPR_ADDITIVE
2 = SPR_INDEXALPHA
3 = SPR_ALPHTEST
*/

export default class Sprite {
    constructor(metadata, frames) {
        this.type = metadata.type
        this.alphaType = metadata.alphaType
        this.radius = metadata.radius
        this.width = metadata.width
        this.height = metadata.height
        this.beamLength = metadata.beamLength
        this.syncType = metadata.syncType
        
        this.frames = frames
    }

    static parseFromArrayBuffer(buffer) {
        let r = new Reader(buffer)

        let magic = r.nstr(4)
        if (magic !== 'IDSP') {
            throw new Error('Invalid sprite file format')
        }

        let header = {
            version: r.i(), // must be 2
            type: r.i(), 
            alphaType: r.i(),
            radius: r.f(),
            width: r.i(),
            height: r.i(),
            frameCount: r.i(),
            beamLength: r.f(),
            syncType: r.i()
        }

        let paletteSize = r.s()
        let palette = r.arr(paletteSize * 3, r.ub.bind(r))

        let frames = []
        for (let i = 0; i < header.frameCount; ++i) {
            let frame = {
                group: r.i(),
                position: [r.i(), r.i()],
                width: r.i(),
                height: r.i(),
                data: new Uint8Array(header.width * header.height * 4)
            }

            let pixels = r.arr(header.width * header.height, r.ub.bind(r))

            for (let j = 0; j < pixels.length; ++j) {
                let r = palette[pixels[j] * 3]
                let g = palette[pixels[j] * 3 + 1]
                let b = palette[pixels[j] * 3 + 2]
                let a = 255
                if (r === 0 && g === 0 && b > 250) {
                    a = 0
                }

                frame.data[4 * j] = r
                frame.data[4 * j + 1] = g
                frame.data[4 * j + 2] = b
                frame.data[4 * j + 3] = a
            }

            frames.push(frame)
        }

        return new Sprite(header, frames)
    }

    static loadFromUrl(url) {
        return xhr(url, {isBinary: true})
        .then(buffer => Sprite.parseFromArrayBuffer(buffer))
    }
}