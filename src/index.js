import Path from 'path'
import UI from './ui'
import Game from './game'
import Map from './map'
import Replay from './replay'
import Wad from './wad'
import xhr from './xhr'

let createDomFromHtml = (html) => {
    let tempNode = document.createElement('div')
    tempNode.innerHTML = html.trim()
    if (tempNode.children.length === 1) {
        return tempNode.firstChild
    } else {
        return tempNode.children
    }
}

let formatLoadingItem = (url, progress) => {
    progress = Math.round(progress * 100).toString()
    let length = 59 - url.length - progress.length
    if (length < 2) {
        url = url.substr(0, 50)
        length = 9 - progress.length
    }
    let dots = Array(length).join('.')
    return `${url}${dots}${progress}%`
}

let loadReplay = (url, ui) => {
    let text = `<li>${formatLoadingItem(url, 0)}</li>`
    let loadText = createDomFromHtml(text)
    ui.dom.loading.appendChild(loadText)
    return Replay.loadFromUrl(url, (r, progress) => {
        loadText.innerHTML = formatLoadingItem(url, progress)
    })
}

let loadMap = (url, ui) => {
    let text = `<li>${formatLoadingItem(url, 0)}</li>`
    let loadText = createDomFromHtml(text)
    ui.dom.loading.appendChild(loadText)
    return Map.loadFromUrl(url, (r, progress) => {
        loadText.innerHTML = formatLoadingItem(url, progress)
    })
}

let mergeWadAndMapTextures = (wad, map) => {
    let cmp = (a, b) => a.toLowerCase() === b.toLowerCase()
    wad.entries.forEach(entry => {
        map.textures.forEach(texture => {
            if (cmp(entry.name, texture.name)) {
                texture.mipmaps = entry.data.texture.mipmaps
            }
        })
    })
}

let checkMissingTextures = (map, paths, ui) => {
    if (map.hasMissingTextures()) {
        let wads = map.entities[0].wad
        let promises = wads.map(wad => loadWad(`./${paths.wads}/${wad}`, map, ui))
        return Promise.all(promises).then(() => map)
    }

    return map
}

let loadWad = (url, map, ui) => {
    let text = `<li>${formatLoadingItem(url, 0)}</li>`
    let loadText = createDomFromHtml(text)
    ui.dom.loading.appendChild(loadText)
    return Wad.loadFromUrl(url, (r, progress) => {
            loadText.innerHTML = formatLoadingItem(url, progress)
        })
        .then(wad => mergeWadAndMapTextures(wad, map))
}

class HLViewer {
    constructor(rootSelector, {
        paths
    }) {
        this.root = document.querySelector(rootSelector)
        if (!this.root) {
            throw new Error(`Could not find element with id: ${rootSelector}`)
        }

        paths = paths || {
            replays: '',
            maps: '',
            wads: ''
        }
        if (!paths.replays) paths.replays = ''
        if (!paths.maps) paths.maps = ''
        if (!paths.wads) paths.wads = ''

        this.paths = paths
        this.game = new Game(this.root)
        this.ui = new UI(this.root, this.game, {
            paths
        })
    }

    load(url) {
        this.ui.showLoadingBox()

        let extension = Path.extname(url)
        if (extension === '.bsp') {
            let mapName = Path.basename(url, '.bsp')
            url = `./${this.paths.maps}/${url}`
            loadMap(url, this.ui)
                .then(map => checkMissingTextures(map, this.paths, this.ui))
                .then(map => this.game.changeMap(map, mapName))
                .then(() => {
                    (this.game.replay.mapName === this.game.mapName)
                        ? this.ui.showReplayControls()
                        : this.ui.hideReplayControls()

                    setTimeout(() => {
                        this.ui.clearLoadingBox()
                        this.ui.hideLoadingBox()
                    }, 3000)
                })
        } else if (extension === '.dem') {
            url = `./${this.paths.replays}/${url}`
            loadReplay(url, this.ui)
                .then(replay => {
                    this.game.changeReplay(replay)
                    this.load(`${replay.mapName}.bsp`)
                })
        } else {
            throw new Error('Invalid file extension')
        }
    }
}

HLViewer.VERSION = require('../package.json').version

// had to do this instead of "export default class"
module.exports = HLViewer