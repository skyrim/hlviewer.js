import { EventEmitter } from 'events'
import * as Path from 'path'
import { Game } from './game'
import { Map } from './map'
import { Replay } from './replay'
import { Sound } from './sound'
import { Tga } from './tga'
import { Wad } from './wad'
import { ProgressCallback } from './xhr'

class LoadItem {
    name: string
    progress: number
    status: LoadItem.Status
    data: any

    constructor(name: string) {
        this.name = name
        this.progress = 0
        this.status = LoadItem.Status.Loading
        this.data = null
    }

    isLoading() {
        return this.status === LoadItem.Status.Loading
    }

    skip() {
        this.status = LoadItem.Status.Skipped
    }

    isSkipped() {
        return this.status === LoadItem.Status.Skipped
    }

    // TODO: Add error reason
    error() {
        this.status = LoadItem.Status.Error
    }

    isError() {
        return this.status === LoadItem.Status.Error
    }

    done(data: any) {
        this.status = LoadItem.Status.Done
        this.data = data
    }

    isDone() {
        return this.status === LoadItem.Status.Done
    }
}

module LoadItem {
    export enum Status {
        Loading = 1,
        Skipped = 2,
        Error   = 3,
        Done    = 4
    }
}

class Loader {
    game: Game
    paths: any

    replay: LoadItem | undefined
    map: LoadItem | undefined
    skies: LoadItem[]
    wads: LoadItem[]
    sounds: LoadItem[]
    events: EventEmitter

    constructor(game: Game) {
        this.game = game
        this.paths = game.paths

        this.replay = undefined
        this.map = undefined
        this.skies = []
        this.wads = []
        this.sounds = []

        this.events = new EventEmitter()
        this.events.addListener('error', (err: any) => {
            console.error(err)
        })
    }

    clear() {
        this.replay = undefined
        this.map = undefined
        this.skies.length = 0
        this.wads.length = 0
        this.sounds.length = 0
    }

    checkStatus() {
        if (this.replay && !this.replay.isDone()) {
            return
        }

        if (this.map && !this.map.isDone()) {
            return
        }

        for (let i = 0; i < this.skies.length; ++i) {
            if (this.skies[i].isLoading()) {
                return
            }
        }

        for (let i = 0; i < this.wads.length; ++i) {
            if (this.wads[i].isLoading()) {
                return
            }
        }

        for (let i = 0; i < this.sounds.length; ++i) {
            if (this.sounds[i].isLoading()) {
                return
            }
        }

        this.events.emit('loadall', this)
    }

    load(name: string) {
        let extension = Path.extname(name)
        if (extension === '.dem') {
            this.loadReplay(name)
        } else if (extension === '.bsp') {
            this.loadMap(name)
        } else {
            this.events.emit('error', 'Invalid file extension', name)
        }
    }

    loadReplay(name: string) {
        this.replay = new LoadItem(name)
        this.events.emit('loadstart', this.replay)

        const progressCbk: ProgressCallback = (_1, progress) => {
            if (this.replay) {
                this.replay.progress = progress
            }

            this.events.emit('progress', this.replay)
        }

        Replay.loadFromUrl(`${this.paths.replays}/${name}`, progressCbk)
        .then(replay => {
            if (!this.replay) {
                return
            }

            this.replay.done(replay)

            this.loadMap(replay.maps[0].name + '.bsp')

            let sounds = replay.maps[0].resources.sounds
            sounds.forEach((sound: any) => {
                if (sound.used) {
                    this.loadSound(sound.name, sound.index)
                }
            })

            this.events.emit('load', this.replay)
            this.checkStatus()
        })
        .catch((err: any) => {
            if (this.replay) {
                this.replay.error()
            }

            this.events.emit('error', err, this.replay)
        })
    }

    loadMap(name: string) {
        this.map = new LoadItem(name)
        this.events.emit('loadstart', this.map)

        const progressCbk: ProgressCallback = (_1, progress) => {
            if (this.map) {
                this.map.progress = progress
            }

            this.events.emit('progress', this.map)
        }

        Map.loadFromUrl(`${this.paths.maps}/${name}`, progressCbk)
        .then(map => {
            if (!this.map) {
                return
            }

            map.name = this.map.name
            this.map.done(map)

            let skyname = map.entities[0].skyname
            if (skyname) {
                 ['bk', 'dn', 'ft', 'lf', 'rt', 'up']
                    .map(a => `${skyname}${a}.tga`)
                    .forEach(a => this.loadSky(a))
            }

            if (map.hasMissingTextures()) {
                let wads = map.entities[0].wad
                wads.forEach((wad: string) => this.loadWad(wad))
            }

            this.events.emit('load', this.map)
            this.checkStatus()
        })
        .catch(err => {
            if (this.map) {
                this.map.error()
            }

            this.events.emit('error', err, this.map)
        })
    }

    loadSky(name: string) {
        let sky = new LoadItem(name)
        this.skies.push(sky)
        this.events.emit('loadstart', sky)

        const progressCbk: ProgressCallback = (_1, progress) => {
            sky.progress = progress
            this.events.emit('progress', sky)
        }

        Tga.loadFromUrl(`${this.paths.skies}/${name}`, progressCbk)
        .then((image: any) => {
            sky.done(image)
            this.events.emit('load', sky)
            this.checkStatus()
        })
        .catch((err: any) => {
            sky.error()
            this.events.emit('error', err, sky)
            this.checkStatus()
        })
    }

    loadWad(name: string) {
        let wad = new LoadItem(name)
        this.wads.push(wad)
        this.events.emit('loadstart', wad)

        const progressCbk: ProgressCallback = (_1, progress) => {
            wad.progress = progress
            this.events.emit('progress', wad)
        }

        Wad.loadFromUrl(`${this.paths.wads}/${name}`, progressCbk)
        .then((w: Wad) => {
            wad.done(w)

            if (!this.map) {
                return
            }

            let map = this.map.data
            let cmp = (a: any, b: any) => a.toLowerCase() === b.toLowerCase()
            w.entries.forEach((entry: any) => {
                map.textures.forEach((texture: any) => {
                    if (cmp(entry.name, texture.name)) {
                        texture.mipmaps = entry.data.texture.mipmaps
                    }
                })
            })

            this.events.emit('load', wad)
            this.checkStatus()
        })
        .catch((err: any) => {
            wad.error()
            this.events.emit('error', err, wad)
            this.checkStatus()
        })
    }

    loadSound(name: string, index: number) {
        let sound = new LoadItem(name)
        this.sounds.push(sound)
        this.events.emit('loadstart', sound)

        const progressCbk: ProgressCallback = (_1, progress) => {
            sound.progress = progress
            this.events.emit('progress', sound)
        }

        Sound.loadFromUrl(`${this.paths.sounds}/${name}`, progressCbk)
        .then((data: any) => {
            data.index = index
            data.name = name
            sound.done(data)
            this.events.emit('load', sound)
            this.checkStatus()
        })
        .catch((err: any) => {
            sound.error()
            this.events.emit('error', err, sound)
            this.checkStatus()
        })
    }
}

export { Loader }
