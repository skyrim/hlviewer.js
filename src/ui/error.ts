import { Component } from '../component'
import { UI } from './ui'

class Error extends Component {
    ui: UI

    constructor(ui: UI) {
        super()

        this.ui = ui
    }
}

export { Error }