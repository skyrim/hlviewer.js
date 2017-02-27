import EventEmitter from 'events'
import Map from './map'
import Path from 'path'
import Replay from './replay'
import Sound from './sound'
import Tga from './tga'
import Wad from './wad'
import xhr from './xhr'

class LoadItem {
    constructor(name) {
        this.name = name
        this.progress = 0
        this.status = LoadItem.STATUS_LOADING()
        this.data = null
    }

    isLoading() {
        return this.status === LoadItem.STATUS_LOADING()
    }

    skip() {
        this.status = LoadItem.STATUS_SKIPPED()
    }

    isSkipped() {
        return this.status === LoadItem.STATUS_SKIPPED()
    }

    error(reason) {
        this.status = LoadItem.STATUS_ERROR()
    }

    isError() {
        return this.status === LoadItem.STATUS_ERROR()
    }

    done(data) {
        this.status = LoadItem.STATUS_DONE()
        this.data = data
    }

    isDone() {
        return this.status === LoadItem.STATUS_DONE()
    }

    static STATUS_LOADING() { return 1 }
    static STATUS_SKIPPED() { return 2 }
    static STATUS_ERROR()   { return 3 }
    static STATUS_DONE()    { return 4 }
}

export default class Loader {
    constructor(game) {
        this.game = game
        this.paths = game.paths

        this.replay = null
        this.map = {}
        this.skies = []
        this.wads = []
        this.sounds = []

        this.events = new EventEmitter()
        this.events.addListener('error', err => {
            console.error(err)
        })
    }

    clear() {
        this.replay = null
        this.map = {}
        this.skies.length = 0
        this.wads.length = 0
        this.sounds.length = 0
    }

    checkStatus() {
        if (this.replay && !this.replay.isDone()) return
        if (!this.map.isDone()) return

        for (let i = 0; i < this.skies.length; ++i)
            if (this.skies[i].isLoading()) return

        for (let i = 0; i < this.wads.length; ++i)
            if (this.wads[i].isLoading()) return
        
        for (let i = 0; i < this.sounds.length; ++i)
            if (this.sounds[i].isLoading()) return

        this.events.emit('loadall', this)
    }

    load(name) {
        let extension = Path.extname(name)
        if (extension === '.dem') {
            this.loadReplay(name)
        }
        else if (extension === '.bsp') {
            this.loadMap(name)
        } else {
            this.events.emit('error', 'Invalid file extension', name)
        }
    }

    loadReplay(name) {
        this.replay = new LoadItem(name)
        this.events.emit('loadstart', this.replay)

        const progressCbk = (req, progress) => {
            this.replay.progress = progress
            this.events.emit('progress', this.replay)
        }

        Replay.loadFromUrl(`${this.paths.replays}/${name}`, progressCbk)
        .then(replay => {
            this.replay.done(replay)
            
            this.loadMap(replay.maps[0].name + '.bsp')

            replay.maps[0].resources.sounds.forEach(sound => {
                if(sound.used) {
                    this.loadSound(sound.name, sound.index)
                }
            })
            
            this.events.emit('load', this.replay)
            this.checkStatus()
        })
        .catch(err => {
            this.replay.error(err)
            this.events.emit('error', err, this.replay)
        })
    }

    loadMap(name) {
        this.map = new LoadItem(name)
        this.events.emit('loadstart', this.map)

        const progressCbk = (request, progress) => {
            this.map.progress = progress
            this.events.emit('progress', this.map)
        }

        let mapName = Path.basename(name, '.bsp')
        Map.loadFromUrl(`${this.paths.maps}/${name}`, progressCbk)
        .then(map => {
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
                wads.forEach(wad => this.loadWad(wad))
            }

            this.events.emit('load', this.map)
            this.checkStatus()
        })
        .catch(err => {
            this.map.error(err)
            this.events.emit('error', err, this.map)
        })
    }

    loadSky(name) {
        let sky = new LoadItem(name)
        this.skies.push(sky)
        this.events.emit('loadstart', sky)

        Tga.loadFromUrl(`${this.paths.skies}/${name}`, (r, progress) => {
            sky.progress = progress
            this.events.emit('progress', sky)
        })
        .then(image => {
            sky.done(image)
            this.events.emit('load', sky)
            this.checkStatus()
        })
        .catch(err => {
            sky.error(err)
            this.events.emit('error', err, sky)
            this.checkStatus()
        })
    }

    loadWad(name) {
        let wad = new LoadItem(name)
        this.wads.push(wad)
        this.events.emit('loadstart', wad)

        const progressCbk = (req, progress) => {
            wad.progress = progress
            this.events.emit('progress', wad)
        }

        Wad.loadFromUrl(`${this.paths.wads}/${name}`, progressCbk)
        .then(w => {
            wad.done(w)

            let map = this.map.data
            let cmp = (a, b) => a.toLowerCase() === b.toLowerCase()
            w.entries.forEach(entry => {
                map.textures.forEach(texture => {
                    if (cmp(entry.name, texture.name)) {
                        texture.mipmaps = entry.data.texture.mipmaps
                    }
                })
            })

            this.events.emit('load', wad)
            this.checkStatus()
        })
        .catch(err => {
            wad.error(err)
            this.events.emit('error', err, wad)
            this.checkStatus()
        })
    }

    loadSound(name, index) {
        let sound = new LoadItem(name)
        this.sounds.push(sound)
        this.events.emit('loadstart', sound)

        const progressCbk = (req, progress) => {
            sound.progress = progress
            this.events.emit('progress', sound)
        }

        Sound.loadFromUrl(`${this.paths.sounds}/${name}`, progressCbk)
        .then(data => {
            data.index = index
            data.name = name
            sound.done(data)
            this.events.emit('load', sound)
            this.checkStatus()
        })
        .catch(err => {
            sound.error(err)
            this.events.emit('error', err, sound)
            this.checkStatus()
        })
    }
}