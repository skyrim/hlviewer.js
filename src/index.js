import Path from 'path'
import UI from './ui'
import Game from './game'
import Map from './map'
import Replay from './replay'
import Wad from './wad'
import Tga from './tga'
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

let formatLoadingItem = (url, progress = 0) => {
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
    let text = `<li>${formatLoadingItem(url)}</li>`
    let loadText = createDomFromHtml(text)
    ui.dom.loadingLog.appendChild(loadText)
    return Replay.loadFromUrl(url, (r, progress) => {
        loadText.innerHTML = formatLoadingItem(url, progress)
    })
}

let loadMap = (url, ui) => {
    let text = `<li>${formatLoadingItem(url)}</li>`
    let loadText = createDomFromHtml(text)
    ui.dom.loadingLog.appendChild(loadText)
    return Map.loadFromUrl(url, (r, progress) => {
        loadText.innerHTML = formatLoadingItem(url, progress)
    })
}

let loadSky = (url, ui, map) => {
    let skyname = map.entities[0].skyname
    if (!skyname) {
        return map
    }

    let skyUrls = [
        `${url}/${skyname}bk.tga`,
        `${url}/${skyname}dn.tga`,
        `${url}/${skyname}ft.tga`,
        `${url}/${skyname}lf.tga`,
        `${url}/${skyname}rt.tga`,
        `${url}/${skyname}up.tga`
    ]

    let promises = []
    for (let i = 0; i < skyUrls.length; ++i) {
        let text = `<li>${formatLoadingItem(skyUrls[i])}</li>`
        let loadText = createDomFromHtml(text)
        ui.dom.loadingLog.appendChild(loadText)
        promises.push(Tga.loadFromUrl(skyUrls[i], (r, progress) => {
            loadText.innerHTML = formatLoadingItem(skyUrls[i], progress)
        }))
    }

    return Promise.all(promises)
    .then((skies) => {
        map.skies = skies
        return map
    })
    .catch(() => {
        return map
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
        let promises = wads.map(
            wad => loadWad(`./${paths.wads}/${wad}`, map, ui)
        )
        return Promise.all(promises).then(() => map)
    }

    return map
}

let loadWad = (url, map, ui) => {
    let text = `<li>${formatLoadingItem(url, 0)}</li>`
    let loadText = createDomFromHtml(text)
    ui.dom.loadingLog.appendChild(loadText)
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
            wads: '',
            skies: ''
        }
        if (typeof paths === 'string') {
            paths = {
                replays: `${paths}/replays`,
                maps: `${paths}/maps`,
                wads: `${paths}/wads`,
                skies: `${paths}/skies`
            }
        } else if (typeof paths === 'object') {
            if (!paths.replays) paths.replays = ''
            if (!paths.maps) paths.maps = ''
            if (!paths.wads) paths.wads = ''
            if (!paths.skies) paths.skies = ''
        } else {
            throw new Error('Invalid paths option')
        }

        this.paths = paths
        this.game = new Game(this.root)
        this.ui = new UI(this.root, this.game, {
            paths
        })
    }

    load(url) {
        this.ui.showLoading()

        let extension = Path.extname(url)
        if (extension === '.bsp') {
            let mapName = Path.basename(url, '.bsp')
            url = `./${this.paths.maps}/${url}`
            return loadMap(url, this.ui)
                .then(map => loadSky(this.paths.skies, this.ui, map))
                .then(map => checkMissingTextures(map, this.paths, this.ui))
                .then(map => {
                    this.game.changeMap(map, mapName)
                    this.ui.showTitle()
                    this.ui.showReplayControls()
                    this.ui.clearLoadingLog()
                    this.ui.hideLoading()
                })
        } else if (extension === '.dem') {
            url = `./${this.paths.replays}/${url}`
            return loadReplay(url, this.ui)
                .then(replay => {
                    this.game.changeReplay(replay)
                    return this.load(`${replay.mapName}.bsp`)
                })
        } else {
            throw new Error('Invalid file extension (must be .dem or .bsp)')
        }
    }
}

HLViewer.VERSION = require('../package.json').version

// had to do this instead of "export default class"
module.exports = HLViewer