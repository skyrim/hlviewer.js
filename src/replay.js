import Reader from './reader.js'
import xhr from './xhr.js'

export default class Replay {
    constructor(header, directories) {
        this.header = header
        this.mapName = this.header.mapName
        this.directories = directories
    }

    static parseFromArrayBuffer(buffer) {
        let r = new Reader(buffer)
        let magic = r.nstr(8)
        if (magic !== 'HLDEMO') {
            throw new Error('Invalid replay format')
        }

        let header = {}
        header.demoProtocol = r.ui()
        header.netProtocol = r.ui()
        header.mapName = r.nstr(260)
        header.modName = r.nstr(260)
        header.mapCrc = r.i()
        header.dirOffset = r.ui()
        
        r.seek(header.dirOffset)
        let directoryCount = r.ui()
        let directories = []
        for (let i = 0; i < directoryCount; ++i) {
            directories.push({
                id: r.ui(),
                name: r.nstr(64),
                flags: r.ui(),
                cdTrack: r.i(),
                time: r.f(),
                frames: r.ui(),
                offset: r.ui(),
                length: r.ui(),
                macros: []
            })
        }

        for (let i = 0; i < directories.length; ++i) {
            r.seek(directories[i].offset)

            let isFinalMacroReached = false
            while (!isFinalMacroReached) {
                let macro = {
                    type: r.b(),
                    time: r.f(),
                    frame: r.ui()
                }
                switch (macro.type) {
                    case 0: case 1:
                        r.skip(4)
                        macro.camera = {
                            position: [r.f(), r.f(), r.f()],
                            orientation: [r.f(), r.f(), r.f()]
                        }
                        r.skip(436)
                        r.skip(r.ui())
                    break
                    
                    case 2:
                        // empty macro that signals the beginning of directory entry
                    break

                    case 3:
                        macro.command = r.nstr(64)
                    break

                    case 4:
                        r.skip(32)
                    break

                    case 5:
                        // empty macro that signals end of directory entry
                        isFinalMacroReached = true
                    break

                    case 6:
                        r.skip(84)
                    break

                    case 7:
                        r.skip(8)
                    break

                    case 8:
                        r.skip(4)
                        r.skip(r.ui() + 16)
                    break

                    case 9:
                        r.skip(r.ui())
                    break

                    default:
                        throw new Error(`Unexpected macro "${macro.type}" while parsing demo at byte address: ${Number(r.tell() - 9).toString(16)}`)
                    break
                }

                directories[i].macros.push(macro)
            }
        }

        return new Replay(header, directories)
    }

    static loadFromUrl(url, progressCallback = null) {
        return xhr(url, {
                isBinary: true,
                progressCallback
            })
            .then(response => Replay.parseFromArrayBuffer(response))
    }
}