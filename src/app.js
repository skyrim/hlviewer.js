import UI from './ui'
import Game from './game'
import xhr from './xhr'

export default class App {
    constructor(rootSelector) {
        this.root = document.querySelector(rootSelector)
        if (!this.root) {
            throw new Error(`Could not find element with id: ${rootSelector}`)
        }

        this.game = new Game(this.root)
        this.ui = new UI(this.root, this.game)
        xhr('replays.json').then((response) => {
            try {
                let replays = JSON.parse(response)
                this.ui.addReplaysToList(replays)
            } catch (e) {
                console.error(e)
            }
        })
    }
}