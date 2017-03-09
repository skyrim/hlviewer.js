import { button, div, span } from '../component'
import { DOM } from '../dom'
import { Game } from '../game'
import * as Time from '../time'
import { Component } from './component'
import { FreeMode } from './freemode'
import { UI } from './ui'

const progressBar = (game: Game) => {
    const player = game.player

    const time = div({class: 'time'})
    const ghostLine = div({class: 'ghost-line'})
    const line = div({class: 'line'})
    const knob = div({class: 'knob'})
    const ghostKnob = div({class: 'ghost-knob'})

    const progressBar = div({class: 'progress'}, [
        time, line, ghostLine, ghostKnob, knob
    ])

    progressBar.on('mouseover', () => {
        time.node.style.display = 'block'
    })

    progressBar.on('mouseout', () => {
        time.node.style.display = 'none'
    })

    progressBar.on('mousemove', (e: MouseEvent) => {
        let bb = progressBar.node.getBoundingClientRect()
        let width = progressBar.node.offsetWidth
        let percent = ((e.pageX - bb.left) / width) * 100
        percent = Math.max(0, Math.min(100, percent))

        ghostKnob.node.style.left = `${percent}%`

        let timeValue = percent * player.replay.length / 100
        let timePos = Math.max(14, Math.min(width - 10, percent * width / 100))
        time.node.style.left = `${timePos}px`
        time.node.textContent = Time.formatTime(timeValue)
    })

    return progressBar
}

const muteButton = (game: Game) => {
    const sound = game.soundSystem

    const speakerHigh = span()
    speakerHigh.node.innerHTML = require('./icons/speakerhigh.svg')
    const speakerLow = span()
    speakerLow.node.innerHTML = require('./icons/speakerlow.svg')
    const speakerOff = span()
    speakerOff.node.innerHTML = require('./icons/speakeroff.svg')

    const muteBtn = button({class: 'button'}, speakerHigh)

    muteBtn.on('click', () => {
        sound.toggleMute()
    })

    sound.events.addListener('volumeChange', (value: number) => {
        let oldIcon = muteBtn.node.firstChild
        let newIcon
        if (value > 0.5) {
            newIcon = speakerHigh
        } else if (value > 0) {
            newIcon = speakerLow
        } else {
            newIcon = speakerOff
        }

        if (!oldIcon) {
            muteBtn.node.appendChild(newIcon.node)
        } else if (oldIcon !== newIcon.node) {
            muteBtn.node.removeChild(oldIcon)
            muteBtn.node.appendChild(newIcon.node)
        }
    })

    return muteBtn
}

const volumeBar = (game: Game) => {
    const sound = game.soundSystem

    const line = div({class: 'line'})
    const knob = div({class: 'knob'})
    const ghostLine = div({class: 'ghost-line'})
    const ghostKnob = div({class: 'ghost-knob'})
    const volumeBar = div({class: 'bar'}, [ghostLine, line, ghostKnob, knob])

    let active = false

    volumeBar.on('mousedown', (e: MouseEvent) => {
        e.preventDefault()
        e.returnValue = false

        active = true

        let bb = volumeBar.node.getBoundingClientRect()
        let width = volumeBar.node.offsetWidth
        let value = (e.pageX - bb.left) / width
        value = Math.max(0, Math.min(1, value))
        sound.setVolume(value)
    })

    window.addEventListener('mouseup', () => {
        active = false
    })

    window.addEventListener('mousemove', (e) => {
        if (!active) {
            return
        }

        let bb = volumeBar.node.getBoundingClientRect()
        let width = volumeBar.node.offsetWidth
        let value = (e.pageX - bb.left) / width
        value = Math.max(0, Math.min(1, value))
        sound.setVolume(value)
    })

    sound.events.addListener('volumeChange', (value: number) => {
        line.node.style.width = `${value * 100}%`
        knob.node.style.left = `${value * 100}%`
    })

    return volumeBar
}

const volumeControl = (game: Game) => (
    div({class: 'volume'}, [
        muteButton(game),
        volumeBar(game)
    ])
)

const replayTime = (game: Game) => {
    const currentTime = span({class: 'current'})

    let lastUpdate = 0
    game.on('postupdate', () => {
        if (Time.now() - lastUpdate < 1000) {
            return
        }

        currentTime.node.textContent = Time.formatTime(game.player.currentTime)

        lastUpdate = Time.now()
    })

    return div({class: 'time'}, [
        currentTime,
        span({class: 'time-divider'}, ' / '),
        span({class: 'total'}, Time.formatTime(game.player.replay.length))
    ])
}

const speedDownButton = (game: Game) => {
    const ICON_SPEED = require('./icons/speed.svg')

    const speedDown = button({class: 'button speeddown'})
    speedDown.node.innerHTML = ICON_SPEED

    speedDown.on('click', () => {
        game.player.speedDown()
    })

    return speedDown
}

const speedUpButton = (game: Game) => {
    const ICON_SPEED = require('./icons/speed.svg')

    const speedUp = button({class: 'button speedup'})
    speedUp.node.innerHTML = ICON_SPEED

    speedUp.on('click', () => {
        game.player.speedUp()
    })

    return speedUp
}

const playButton = (game: Game) => {
    const ICON_PLAY = require('./icons/play.svg')
    const ICON_PAUSE = require('./icons/pause.svg')

    const play = button({class: 'button play'})

    play.on('click', () => {
        if (!game.player.isPlaying || game.player.isPaused) {
            game.player.play()
        } else {
            game.player.pause()
        }
    })

    const onChange = () => {
         if (!game.player.isPlaying || game.player.isPaused) {
            play.node.innerHTML = ICON_PLAY
        } else {
            play.node.innerHTML = ICON_PAUSE
        }
    }

    game.player.on('play', onChange)
    game.player.on('pause', onChange)
    game.player.on('stop', onChange)

    // initialize
    onChange()

    return play
}

/*const settingsButton = () => {
    const component = button({class: 'button settings'})
    component.node.innerHTML = require('./icons/settings.svg')

    // TODO

    return component
}*/

const fullscreenButton = (ui: UI) => {
    const ICON_FULLSCREEN = require('./icons/fullscreen.svg')
    const ICON_SMALLSCREEN = require('./icons/smallscreen.svg')
    const component = button({class: 'button fullscreen'})

    component.on('click', () => {
        ui.toggleFullscreen()
    })

    const onChange = (status: boolean) => {
        if (status) {
            component.node.innerHTML = ICON_SMALLSCREEN
        } else {
            component.node.innerHTML = ICON_FULLSCREEN
        }
    }

    ui.on('fullscreen', onChange)

    // init
    onChange(false)

    return component
}

class ReplayMode implements Component {
    private ui: UI
    private game: Game
    private node: HTMLElement

    private inFocus: boolean
    private onPlayerChange: () => void

    constructor(ui: UI, game: Game) {
        this.ui = ui
        this.game = game

        const SETTINGS = require('./icons/settings.svg')
        const TEMPLATE =
            `<div class="controls">
                <ul class="settings-menu">
                    <li class="mode">Mode</li>
                    <li class="settings-item replay-mode active">Replay</li>
                    <li class="settings-item free-mode">Free</li>
                </ul>
                <div class="buttons">
                    <div class="right-buttons">
                        <button class="settings button">${SETTINGS}</button>
                    </div>
                </div>
            </div>`

        let controls = DOM.htmlToElement(TEMPLATE)
        let root = DOM.find(this.ui.getNode(), '.style-wrapper')
        root.appendChild(controls)

        game.mode = Game.MODE_REPLAY
        this.inFocus = false

        let pb = progressBar(game)
        if (controls.firstChild) {
            controls.insertBefore(pb.node, controls.firstChild)
        } else {
            controls.appendChild(pb.node)
        }

        const leftButtons = div({class: 'left-buttons'}, [
            speedDownButton(game),
            playButton(game),
            speedUpButton(game),
            volumeControl(game),
            replayTime(game)
        ])

        const buttons = DOM.find(controls, '.buttons')
        if (buttons.firstChild) {
            buttons.insertBefore(leftButtons.node, buttons.firstChild)
        } else {
            buttons.appendChild(leftButtons.node)
        }

        const fullscreenBtn = fullscreenButton(ui)
        const rightButtons = DOM.find(controls, '.buttons .right-buttons')
        rightButtons.appendChild(fullscreenBtn.node)

        // settings
        const settingsMenu = DOM.find(controls, '.settings-menu')
        const settingsBtn = DOM.find(controls, '.settings')
        settingsBtn.addEventListener('click', () => {
            if (!settingsMenu) {
                return
            }

            if (settingsMenu.style.display === 'block') {
                settingsMenu.style.display = 'none'
            } else {
                settingsMenu.style.display = 'block'
            }
        })

        const settingsFreeMode = DOM.find(controls, '.settings-menu .free-mode')
        settingsFreeMode.addEventListener('click', () => {
            let freeMode = new FreeMode(ui, game)
            this.ui.changeToComponent(freeMode)
        })

        // ui visibility
        let hideControlsTimer: any

        root.addEventListener('mouseover', () => {
            controls.style.opacity = '1'
        })

        root.addEventListener('mouseout', () => {
            controls.style.opacity = '0'
            if (hideControlsTimer) {
                clearTimeout(hideControlsTimer)
            }
        })

        root.addEventListener('mousemove', () => {
            controls.style.opacity = '1'
            root.style.cursor = 'default'
            clearTimeout(hideControlsTimer)
            hideControlsTimer = setTimeout(
                () => {
                    controls.style.opacity = '0'
                    root.style.cursor = 'none'
                },
                3000)
        })

        /*window.addEventListener('mousedown', (e) => {
            let path = DOM.createPath(e)

            let el = path.find(e => e === ui.getNode())
            this.inFocus = (el !== undefined)
        })*/

        // time
        /*const totalTimeText = DOM.find(controls, '.time .total')
        totalTimeText.innerText = Time.formatTime(game.player.replay.length)

        let progressBarActive = false
        const progressBar = DOM.find(controls, '.progress')
        const progressBarTime = DOM.find(controls, '.progress .time')
        const progressBarGhostKnob = DOM.find(controls, '.progress .ghost-knob')

        progressBar.addEventListener('mousedown', (e) => {
            if (!game.player.isPlaying) {
                this.game.player.pause()
            }

            progressBarActive = true
            let bb = progressBar.getBoundingClientRect()
            let percent = ((e.pageX - bb.left) / progressBar.offsetWidth) * 100
            game.player.seekByPercent(percent)
        })

        window.addEventListener('mouseup', () => {
            progressBarActive = false
        })

        progressBar.addEventListener('mouseover', () => {
            progressBarGhostKnob.style.display = 'block'
            progressBarTime.style.display = 'block'
        })

        progressBar.addEventListener('mouseout', () => {
            progressBarGhostKnob.style.display = 'none'
            progressBarTime.style.display = 'none'
        })

        progressBar.addEventListener('mousemove', (e) => {
            let bb = progressBar.getBoundingClientRect()
            let parentWidth = progressBar.offsetWidth
            let percent = ((e.pageX - bb.left) / parentWidth) * 100
            percent = Math.max(0, Math.min(100, percent))
            progressBarGhostKnob.style.left = `${percent}%`
            if (progressBarActive) {
                game.player.seekByPercent(percent)
            }

            let time = percent * this.game.player.replay.length / 100
            let timePos = Math.max(14, percent * parentWidth / 100)
            timePos = Math.min(parentWidth - 10, timePos)
            progressBarTime.style.left = `${timePos}px`
            progressBarTime.innerText = Time.formatTime(time)
        })

        let progressBarLastUpdate = 0
        let timeTextUpdate = 0
        const timeText = DOM.find(controls, '.time .current')
        const progressBarKnob = DOM.find(controls, '.progress .knob')
        const progressBarLine = DOM.find(controls, '.progress .line')
        game.events.addListener('postupdate', () => {
            let time = Time.now()
            if (time - progressBarLastUpdate >= 100) {
                let p = game.player
                if (p.replay) {
                    let pnt = p.currentTime / p.replay.length * 100
                    progressBarKnob.style.left = `${pnt}%`
                    progressBarLine.style.right = `${100 - pnt}%`
                }

                progressBarLastUpdate = time
            }

            if (time - timeTextUpdate >= 1000) {
                let p = game.player
                if (p.replay) {
                    let currentTime = Time.formatTime(p.currentTime)
                    timeText.innerText = currentTime
                }
            }
        })*/

        // This may seem silly, but...
        // When I used "click" event it stopped working after third doubleclick
        // on the same spot. So I tried creating my own click using
        // "mousedown" + "mouseup" events and now user can spam doubleclicks
        // on the same spot and player will go in and out of fullscreen
        // as intended.
        let screenPauseDownOnScreen = false
        let screenPauseTimer: any = 0
        const screen = DOM.find(ui.getNode(), '.screen')

        screen.addEventListener('mousedown', (e) => {
            if (e.button !== 0) {
                return
            }

            screenPauseDownOnScreen = true
        })

        window.addEventListener('mouseup', (e) => {
            if (e.button !== 0) {
                return
            }

            let path = DOM.createPath(e)
            if (path[1] !== screen) {
                screenPauseDownOnScreen = false
            }
        })

        screen.addEventListener('mouseup', (e) => {
            if (e.button !== 0 || !screenPauseDownOnScreen) {
                return
            }

            if (game.mode === Game.MODE_REPLAY) {
                if (screenPauseTimer) {
                    // toggleFullscreen()
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

        // keyboard shortcuts
        window.addEventListener('keydown', (e) => {
            if (!this.inFocus) {
                return
            }

            if (game.mode === Game.MODE_REPLAY) {
                switch (e.which) {
                    case 70: { // F
                        // toggleFullscreen()
                        break
                    }
                    case 74:   // J
                    case 37: { // left arrow
                        let currentTime = game.player.currentTime
                        game.player.seek(currentTime - 5)
                        break
                    }
                    case 75:   // K
                    case 32: { // space
                        if (!game.player.isPlaying || game.player.isPaused) {
                            game.player.play()
                        } else {
                            game.player.pause()
                        }
                        break
                    }
                    case 76:   // L
                    case 39: { // right arrow
                        let currentTime = game.player.currentTime
                        game.player.seek(currentTime + 5)
                        break
                    }
                    case 38: { // up arrow
                        // updateVolume(game.soundSystem.getVolume() + 0.05)
                        break
                    }
                    case 40: { // down arrow
                        // updateVolume(game.soundSystem.getVolume() - 0.05)
                        break
                    }
                    case 77: { // M
                        // toggleMute()
                        break
                    }
                }
            }
        })

        this.node = controls
    }

    detach() {
        this.game.events.removeListener('play', this.onPlayerChange)
        this.game.events.removeListener('pause', this.onPlayerChange)
        this.game.events.removeListener('stop', this.onPlayerChange)
        let parent = this.node.parentNode
        if (parent) {
            parent.removeChild(this.node)
        }
    }
}

export { ReplayMode }
