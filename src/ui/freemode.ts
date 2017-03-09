import { DOM } from '../dom'
import { Game } from '../game'
import { Component } from './component'
import { UI } from './ui'

class FreeMode implements Component {
    private ui: UI
    private game: Game
    private node: HTMLElement

    constructor(ui: UI, game: Game) {
        this.ui = ui
        this.game = game

        const SETTINGS = require('./icons/settings.svg')
        const FULLSCREEN = require('./icons/fullscreen.svg')
        const TEMPLATE =
            `<div class="controls">
                <ul class="settings-menu">
                    <li class="mode">Mode</li>
                    <li class="settings-item replay-mode">Replay</li>
                    <li class="settings-item free-mode">Free</li>
                </ul>
                <div class="buttons" draggable="false">
                    <div class="left-buttons"></div>
                    <div class="right-buttons">
                        <button class="settings button">${SETTINGS}</button>
                        <button class="fullscreen button">${FULLSCREEN}</button>
                    </div>
                </div>
            </div>`

        let controls = DOM.htmlToElement(TEMPLATE)
        let root = DOM.find(this.ui.getNode(), '.style-wrapper')
        root.appendChild(controls)

        game.mode = Game.MODE_FREE

        this.node = controls
    }

    detach() {
        let parent = this.node.parentNode
        if (parent) {
            parent.removeChild(this.node)
        }
    }
}

export { FreeMode }
