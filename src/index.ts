import { Game } from './game'
import { UI } from './ui/ui'

class HLViewer {
    static readonly VERSION = require('../package.json').version

    root: HTMLElement
    paths: any
    game: Game
    ui: UI

    constructor(rootSelector: string, { paths }: any) {
        let root = document.querySelector(rootSelector)
        if (!(root && root instanceof HTMLElement)) {
            throw new Error(`Could not find element with id: ${rootSelector}`)
        }

        paths = paths || {
            replays: '',
            maps:    '',
            wads:    '',
            skies:   '',
            sounds:  ''
        }
        if (typeof paths === 'string') {
            paths = {
                replays: `${paths}/replays`,
                maps:    `${paths}/maps`,
                wads:    `${paths}/wads`,
                skies:   `${paths}/skies`,
                sounds:  `${paths}/sounds`
            }
        } else if (typeof paths === 'object') {
            if (!paths.replays) { paths.replays = '' }
            if (!paths.maps)    { paths.maps = '' }
            if (!paths.wads)    { paths.wads = '' }
            if (!paths.skies)   { paths.skies = '' }
            if (!paths.sounds)  { paths.sounds = '' }
        } else {
            throw new Error('Invalid paths option')
        }

        this.root = root
        this.paths = paths
        this.game = new Game(paths)
        this.ui = new UI(this.root, this.game)
    }

    load(name: string) {
        this.game.load(name)
    }
}

// had to do this instead of "export default class"
let wnd: any = window
wnd.HLViewer = HLViewer
