import xhr from './xhr.js'
import Reader, {TYPE_UB} from './reader.js'

function parseMipMaps(r, width, height) {
    let mipmaps = [0, 0, 0, 0]
        .map((m, i) => r.arrx((width * height) / Math.pow(1<<i, 2), TYPE_UB))
        
    r.skip(2)

    let palette = r.arrx(256 * 3, TYPE_UB)

    return mipmaps.map(m => {
        let pixels = new Uint8Array(m.length * 4)

        for (let i = 0; i < m.length; ++i) {
            let r = palette[m[i] * 3]
            let g = palette[m[i] * 3 + 1]
            let b = palette[m[i] * 3 + 2]

            if (r === 0 && g === 0 && b === 255) {
                pixels[4 * i]     = 0
                pixels[4 * i + 1] = 0
                pixels[4 * i + 2] = 0
                pixels[4 * i + 3] = 0
            } else {
                pixels[4 * i]     = r
                pixels[4 * i + 1] = g
                pixels[4 * i + 2] = b
                pixels[4 * i + 3] = 255
            }
        }

        return pixels
    })
}

function parseTexture(r, entry) {
    let baseOffset = r.tell()

    let name = r.nstr(16)
    let texture = {
        width: r.ui(),
        height: r.ui(),
        mipmaps: []
    }

    let mipmapOffset = r.ui()
    r.seek(baseOffset + mipmapOffset)
    texture.mipmaps = parseMipMaps(r, texture.width, texture.height)

    return { texture }
}

function parseEntry(r, entry) {
    r.seek(entry.offset)
    switch (entry.type) {
        case 67:
            return parseTexture(r, entry)
        break

        default:
            // unknown data type; return array of bytes
            return r.arr(entry.length, r.ub.bind(r))
        break
    }
}

export default class Wad {
    constructor(entries) {
        this.entries = entries
    }

    static parseFromArrayBuffer(buffer) {
        let r = new Reader(buffer)

        let magic = r.nstr(4)
        if (magic !== 'WAD3') {
            throw new Error('Invalid WAD file format')
        }

        let entryCount = r.ui()
        let directoryOffset = r.ui()
        r.seek(directoryOffset)
        let entries = []
        for (let i = 0; i < entryCount; ++i) {
            let entry = {
                offset: r.ui(),
                diskLength: r.ui(),
                length: r.ui(),
                type: r.b(),
                isCompressed: r.b()
            }
            r.skip(2)
            entry.name = r.nstr(16)
            entries.push(entry)
        }

        entries.forEach(e => {
            e.data = parseEntry(r, e)
        })

        return new Wad(entries.map(e => ({
            name: e.name,
            data: e.data
        })))
    }

    static loadFromUrl(url) {
        return xhr(url, {isBinary: true})
            .then(response => Wad.parseFromArrayBuffer(response))
    }
}