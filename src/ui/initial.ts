import { Component, div } from '../component'
import { Game } from '../game'
import { UI } from './ui'

class Initial extends Component {
    private ui: UI
    private game: Game

    constructor(ui: UI) {
        super()

        let game = ui.game
        this.ui = ui
        this.game = game
        this.node = div().node

        game.events.on('loadstart', () => {
            this.ui.changeToComponent(UI.Mode.Loading)
        })
    }
}

export { Initial }
