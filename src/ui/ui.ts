import { EventEmitter } from 'events'
import { DOM } from '../dom'
import { Fullscreen } from '../fullscreen'
import { Game } from '../game'
import { Component } from './component'
import { Initial } from './initial'

class UI {
    private static style: Element
    private static readonly TEMPLATE: string =
        `<div class="hlv">
            <div class="unset-wrapper">
                <div class="style-wrapper">
                    <div class="screen"></div>
                </div>
            </div>
        </div>`

    private target: Element
    private game: Game
    private node: Element
    private component: Component
    private title: string = ''
    private events: EventEmitter
    private inFullscreen: boolean

    constructor(target: Element, game: Game) {
        if (!UI.style) {
            let styleTemplate = require('./templates/style.css')
            styleTemplate = `<style>${styleTemplate}</style>`
            UI.style = DOM.htmlToElement(styleTemplate)
            document.head.appendChild(UI.style)
        }

        this.node = DOM.htmlToElement(UI.TEMPLATE)
        target.appendChild(this.node)

        this.component = new Initial(this, game)

        let screen = this.node.querySelector('.screen')
        if (screen) {
            screen.appendChild(game.getCanvas())
        }

        Fullscreen.onChange(() => {
            let currentStatus = Fullscreen.element() === this.node
            if (currentStatus !== this.inFullscreen) {
                this.events.emit('fullscreen', currentStatus)
                this.inFullscreen = currentStatus
            }
        })

        this.inFullscreen = false
        this.events = new EventEmitter()
        this.target = target
        this.game = game
    }

    on(eventName: string, callback: any) {
        return this.events.on(eventName, callback)
    }

    off(eventName: string, callback: any) {
        this.events.removeListener(eventName, callback)
    }

    toggleFullscreen() {
        if (Fullscreen.element() === this.node) {
            Fullscreen.exit()
            // this.events.emit('fullscreen', false)
        } else {
            Fullscreen.enter(this.node)
            // this.events.emit('fullscreen', true)
        }
    }

    getNode(): Element {
        return this.node
    }

    changeToComponent(component: Component) {
        this.component.detach()
        this.component = component
    }

    setTitle(value: string) {
        this.title = value
    }
}

export { UI }
