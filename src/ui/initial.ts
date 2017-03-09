import { Game } from '../game'
import { Component } from './component'
import { Loading } from './loading'
import { UI } from './ui'

class Initial implements Component {
    private ui: UI
    private game: Game
    private onLoadStart: () => void

    constructor(ui: UI, game: Game) {
        this.ui = ui
        this.game = game

        this.onLoadStart = () => {
            let loading = new Loading(this.ui, this.game)
            this.ui.changeToComponent(loading)
        }

        game.events.on('loadstart', this.onLoadStart)
    }

    detach(): void {
        this.game.events.removeListener('loadstart', this.onLoadStart)
    }
}

export { Initial }
