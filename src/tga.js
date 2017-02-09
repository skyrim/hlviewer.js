import Path from 'path'
import Reader, {TYPE_UB} from './reader.js'
import xhr from './xhr.js'

export default class Tga {
    constructor(name, width, height, data) {
        this.name = name
        this.width = width
        this.height = height
        this.data = data
    }

    static parseFromArrayBuffer(buffer, url) {
        let r = new Reader(buffer)
        
        let header = {
            idLength:     r.ub(),
            colorMapType: r.ub(),
            imageType:    r.ub(),
            colorMap: {
                firstEntryIndex: r.us(),
                length:          r.us(),
                size:            r.ub()
            },
            image: {
                xOrigin:    r.us(),
                yOrigin:    r.us(),
                width:      r.us(),
                height:     r.us(),
                depth:      r.ub(),
                descriptor: r.ub()
            }
        }

        let imageId
        if (header.idLength) {
            imageId = r.arrx(header.idLength, TYPE_UB)
        }

        let colorMapData
        if (header.colorMapType) {
            throw new Error('Not implemented')
            colorMapData = r.arrx(header.colorMap.length, TYPE_UB)
        }

        let w = header.image.width
        let h = header.image.height
        let pixelCount = w * h
        let imageData

        if (header.imageType === 0x02) {
            imageData = r.arrx(pixelCount *  header.image.depth / 8, TYPE_UB)
            if (header.image.depth === 24) {
                let temp = new Uint8Array(pixelCount * 4)
                for (let i = 0; i < h; ++i) {
                    for (let j = 0; j < w; ++j) {
                        let dst = (h - 1 - i) * w + j
                        temp[dst * 4    ] = imageData[(i * w + j) * 3 + 2]
                        temp[dst * 4 + 1] = imageData[(i * w + j) * 3 + 1]
                        temp[dst * 4 + 2] = imageData[(i * w + j) * 3]
                        temp[dst * 4 + 3] = 255
                    }
                }
                imageData = temp
            } else if (header.image.depth === 32) {
                let temp = new Uint8Array(pixelCount * 4)
                for (let i = 0; i < h; ++i) {
                    for (let j = 0; j < w; ++j) {
                        let dst = (h - 1 - i) * w + j
                        temp[dst * 4    ] = imageData[(i * w + j) * 3 + 2]
                        temp[dst * 4 + 1] = imageData[(i * w + j) * 3 + 1]
                        temp[dst * 4 + 2] = imageData[(i * w + j) * 3]
                        temp[dst * 4 + 3] = 255
                    }
                }
                imageData = temp
            }
        } else if (header.imageType === 0x0A) {
            imageData = new Uint8Array(pixelCount * 4)
            if (header.image.depth === 24) {
                for (let i = 0; i < h; ++i) {
                    for (let j = 0; j < w; /*++j*/) {
                        let repCount = r.ub()
                        if (repCount & 0x80) {
                            repCount = (repCount & 0x7f) + 1
                            let bl = r.ub()
                            let gr = r.ub()
                            let rd = r.ub()
                            while (j < w && repCount) {
                                let dst = (h - 1 - i) * w + j
                                imageData[dst * 4    ] = rd
                                imageData[dst * 4 + 1] = gr
                                imageData[dst * 4 + 2] = bl
                                imageData[dst * 4 + 3] = 255
                                ++j
                                --repCount
                            }
                        } else {
                            repCount = (repCount & 0x7f) + 1
                            while (j < w && repCount) {
                                let dst = (h - 1 - i) * w + j
                                imageData[dst * 4 + 2] = r.ub()
                                imageData[dst * 4 + 1] = r.ub()
                                imageData[dst * 4    ] = r.ub()
                                imageData[dst * 4 + 3] = 255
                                ++j
                                --repCount
                            }
                        }
                    }
                }
            }
        }

        let name = Path.basename(url, '.tga')
        return new Tga(name, header.image.width, header.image.height, imageData)
    }

    static loadFromUrl(url, progressCallback = null) {
        return xhr(url, {
                isBinary: true,
                progressCallback
            })
            .then(response => Tga.parseFromArrayBuffer(response, url))
    }
}