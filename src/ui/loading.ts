import { Component, div, li, ul } from '../component'
import { Game } from '../game'
import { Loader } from '../loader'
import { UI } from './ui'

class Loading extends Component {
    private ui: UI
    private game: Game

    private onLoad: (loader: Loader) => void
    private onItemLoad: (item: any) => void
    private onItemProgress: (item: any) => void

    constructor(ui: UI) {
        super()

        let game = ui.game
        this.ui = ui
        this.game = game

        let spinner = div({class: 'spinner'})
        spinner.node.innerHTML = require('./icons/loading.svg')

        let log = ul({class: 'log'})

        let root = div({class: 'loading'}, [
            spinner,
            log
        ])
        this.node = root.node

        let items: Array<{item: any, node: Component}> = []

        const formatItem = (name: string, status: string) => {
            let length = 59 - name.length - status.length
            if (length < 2) {
                name = name.substr(0, 50)
                length = 9 - status.length
            }

            let dots = Array(length).join('.')

            return `${name}${dots}${status}`
        }

        this.onItemLoad = (item: any) => {
            for (let i = 0; i < items.length; ++i) {
                if (items[i] === item) {
                    return
                }
            }

            let node = li({}, formatItem(item.name, '0%'))
            items.push({ item, node })
            log.node.appendChild(node.node)
        }

        this.onItemProgress = (item: any) => {
            let entry
            for (let i = 0; i < items.length; ++i) {
                if (items[i].item === item) {
                    entry = items[i]
                    break
                }
            }

            if (!entry) {
                return
            }

            let name = entry.item.name
            let progress = `${Math.round(entry.item.progress * 100)}%`
            entry.node.node.textContent = formatItem(name, progress)
        }

        this.onLoad = (loader: Loader) => {
            if (loader.replay) {
                this.ui.changeToComponent(UI.Mode.Replay)
            } else {
                this.ui.changeToComponent(UI.Mode.Free)
            }
        }

        game.loader.events.on('loadstart', this.onItemLoad)
        game.loader.events.on('progress', this.onItemProgress)
        game.events.on('load', this.onLoad)
    }

    detach(): void {
        this.game.events.removeListener('load', this.onLoad)
        this.game.loader.events.removeListener('loadstart', this.onItemLoad)
        this.game.loader.events.removeListener('progress', this.onItemProgress)

        let parent = this.node.parentNode
        if (parent) {
            parent.removeChild(this.node)
        }
    }
}

export { Loading }
