import { DOM } from '../dom'
import { Game } from '../game'
import { Loader } from '../loader'
import { Component } from './component'
import { FreeMode } from './freemode'
import { ReplayMode } from './replaymode'
import { UI } from './ui'

class Loading implements Component {
    private ui: UI
    private game: Game
    private node: Element
    private onLoad: (loader: Loader) => void
    private onItemLoad: (item: any) => void
    private onItemProgress: (item: any) => void

    constructor(ui: UI, game: Game) {
        this.ui = ui
        this.game = game

        const LOADING_ANIMATION = require('./icons/loading.svg')
        const TEMPLATE =
            `<div class="loading">
                <div class="spinner">${LOADING_ANIMATION}</div>
                <ul class="log"></ul>
            </div>`
        this.node = DOM.htmlToElement(TEMPLATE)

        let root = this.ui.getNode().querySelector('.style-wrapper')
        if (root) {
            root.appendChild(this.node)
        }

        let log = this.node.querySelector('.log')

        let items: Array<{item: any, node: Element}> = []

        const formatItem = (name: string, status: string, color: string) => {
            let length = 59 - name.length - status.length
            if (length < 2) {
                name = name.substr(0, 50)
                length = 9 - status.length
            }
            let dots = Array(length).join('.')

            let format =
                `<span style="color:${color}">
                    ${name}${dots}${status}
                </span>`

            return format
        }

        this.onLoad = (loader: Loader) => {
            if (loader.replay) {
                let replay = new ReplayMode(this.ui, this.game)
                this.ui.changeToComponent(replay)
            } else {
                let free = new FreeMode(this.ui, this.game)
                this.ui.changeToComponent(free)
            }
        }
        this.onItemLoad = (item: any) => {
            for (let i = 0; i < items.length; ++i) {
                if (items[i] === item) {
                    return
                }
            }

            let node = DOM.htmlToElement('<li></li>')
            node.innerHTML = formatItem(item.name, '0%', 'white')
            items.push({
                item,
                node
            })
            if (log) {
                log.appendChild(node)
            }
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
            entry.node.innerHTML = formatItem(name, progress, 'white')
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
