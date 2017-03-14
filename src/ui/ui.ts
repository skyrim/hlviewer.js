import { EventEmitter } from 'events'
import { Component, div } from '../component'
import { DOM } from '../dom'
import { Fullscreen } from '../fullscreen'
import { Game } from '../game'
import { Error } from './error'
import { FreeMode } from './freemode'
import { Initial } from './initial'
import { Loading } from './loading'
import { ReplayMode } from './replaymode'

class UI {
    private static style: Element

    private target: Element
    game: Game
    node: Element
    component: Component
    componentTarget: Component
    private title: string = ''
    private events: EventEmitter
    private fullscreened: boolean
    private focused: boolean

    constructor(target: Element, game: Game) {
        if (!UI.style) {
            let styleTemplate = require('./templates/style.css')
            styleTemplate = `<style>${styleTemplate}</style>`
            UI.style = DOM.htmlToElement(styleTemplate)
            document.head.appendChild(UI.style)
        }

        let screen = div({class: 'screen'})
        screen.node.appendChild(game.getCanvas())

        let componentTarget = div({class: 'style-wrapper'}, screen)

        let root = div({class: 'hlv'}, [
            div({class: 'unset-wrapper'}, [
                componentTarget
            ])
        ])
        this.node = root.node
        this.componentTarget = componentTarget

        target.appendChild(root.node)

        Fullscreen.onChange(() => {
            let currentStatus = Fullscreen.element() === this.node
            if (currentStatus !== this.fullscreened) {
                this.events.emit('fullscreen', currentStatus)
                this.fullscreened = currentStatus
            }
        })

        window.addEventListener('mousedown', (e) => {
            let path = DOM.createPath(e)

            let el = path.find(e => e === this.node)
            this.focused = (el !== undefined)
        })

        // auto hide ui
        let hideControlsTimer: any
        root.node.addEventListener('mouseover', () => {
            this.component.node.style.opacity = '1'
        })

        root.node.addEventListener('mouseout', () => {
            this.component.node.style.opacity = '0'
            if (hideControlsTimer) {
                clearTimeout(hideControlsTimer)
            }
        })

        root.on('mousemove', () => {
            this.component.node.style.opacity = '1'
            root.node.style.cursor = 'default'
            clearTimeout(hideControlsTimer)
            hideControlsTimer = setTimeout(
                () => {
                    this.component.node.style.opacity = '0'
                    root.node.style.cursor = 'none'
                },
                3000)
        })

        window.addEventListener('keydown', (e: KeyboardEvent) => {
            if (!this.focused) {
                return
            }

            switch (e.which) {
                case 70: { // F
                    this.toggleFullscreen()
                    break
                }
            }
        })

        // This may seem silly, but...
        // When I used "click" event it stopped working after third doubleclick
        // on the same spot. So I tried creating my own click using
        // "mousedown" + "mouseup" events and now user can spam doubleclicks
        // on the same spot and player will go in and out of fullscreen
        // as intended.
        let screenPauseDownOnScreen = false
        let screenPauseTimer: any = 0

        screen.on('mousedown', (e: MouseEvent) => {
            if (e.button !== 0) {
                return
            }

            screenPauseDownOnScreen = true
        })

        window.addEventListener('mouseup', (e: MouseEvent) => {
            if (e.button !== 0) {
                return
            }

            let path = DOM.createPath(e)
            if (path[1] !== screen.node) {
                screenPauseDownOnScreen = false
            }
        })

        screen.on('mouseup', (e: MouseEvent) => {
            if (e.button !== 0 || !screenPauseDownOnScreen) {
                return
            }

            if (game.mode === Game.MODE_REPLAY) {
                if (screenPauseTimer) {
                    this.toggleFullscreen()
                    clearTimeout(screenPauseTimer)
                    screenPauseTimer = 0
                } else {
                    screenPauseTimer = 1
                    screenPauseTimer = setTimeout(
                        () => {
                            screenPauseTimer = 0
                            let p = this.game.player
                            if (!p.isPlaying || p.isPaused) {
                                p.play()
                            } else {
                                p.pause()
                            }
                        },
                        200)
                }
            }
        })

        this.focused = false
        this.fullscreened = false
        this.events = new EventEmitter()
        this.target = target
        this.game = game

        this.changeToComponent(UI.Mode.Initial)
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
        } else {
            Fullscreen.enter(this.node)
        }
    }

    isFullscreened() {
        return this.fullscreened
    }

    isFocused() {
        return this.focused
    }

    getNode(): Element {
        return this.node
    }

    changeToComponent(mode: UI.Mode) {
        if (this.component) {
            let parent = this.component.node.parentNode
            if (parent) {
                parent.removeChild(this.component.node)
            }
        }

        switch (mode) {
            case UI.Mode.Initial: {
                this.component = new Initial(this)
                break
            }
            case UI.Mode.Loading: {
                this.component = new Loading(this)
                break
            }
            case UI.Mode.Error: {
                this.component = new Error(this)
                break
            }
            case UI.Mode.Replay: {
                this.component = new ReplayMode(this)
                break
            }
            case UI.Mode.Free: {
                this.component = new FreeMode(this)
                break
            }
        }

        this.componentTarget.node.appendChild(this.component.node)
    }

    setTitle(value: string) {
        this.title = value
    }
}

module UI {
    export enum Mode {
        Initial,
        Error,
        Loading,
        Replay,
        Free
    }
}

export { UI }
