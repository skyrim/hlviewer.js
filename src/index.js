import Path from 'path'
import UI from './ui'
import Game from './game'
import Map from './map'
import Replay from './replay'
import Wad from './wad'
import Tga from './tga'
import xhr from './xhr'

class HLViewer {
    constructor(rootSelector, { paths }) {
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
        this.game = new Game(paths)
        this.ui = new UI(this.root, this.game, {
            paths
        })
    }

    load(name) {
        this.game.load(name)
    }
}

HLViewer.VERSION = require('../package.json').version

// had to do this instead of "export default class"
module.exports = HLViewer