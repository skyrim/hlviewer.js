import { button, Component, div, li, span, ul } from '../component'
import { DOM } from '../dom'
import { Game } from '../game'
import * as Time from '../time'
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

    let active = false
    progressBar.on('mousedown', (e: MouseEvent) => {
        e.preventDefault()
        e.returnValue = false

        let bb = progressBar.node.getBoundingClientRect()
        let width = progressBar.node.offsetWidth
        let percent = ((e.pageX - bb.left) / width) * 100
        percent = Math.max(0, Math.min(100, percent))
        game.player.seekByPercent(percent)
        game.player.pause()

        active = true
    })

    window.addEventListener('mouseup', () => {
        active = false
    })

    let lastUpdate = 0
    game.on('postupdate', () => {
        if (Time.now() - lastUpdate < 100) {
            return
        }

        let percent = game.player.currentTime / game.player.replay.length * 100
        knob.node.style.left = `${percent}%`
        line.node.style.right = `${100 - percent}%`

        lastUpdate = Time.now()
    })

    progressBar.on('mousemove', (e: MouseEvent) => {
        let bb = progressBar.node.getBoundingClientRect()
        let width = progressBar.node.offsetWidth
        let percent = ((e.pageX - bb.left) / width) * 100
        percent = Math.max(0, Math.min(100, percent))

        if (active) {
            game.player.seekByPercent(percent)
        }

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

    onChange(ui.isFullscreened())

    return component
}

const settingsComponent = () => {
    const freeItem = li({class: 'settings-item free-mode'}, 'Free')
    freeItem.on('click', () => {
        // TODO
        // let freeMode = new FreeMode(ui, game)
        // ui.changeToComponent(freeMode)
    })
    const menu = ul({class: 'settings-menu'}, [
        li({class: 'mode'}, 'Mode'),
        li({class: 'settings-item replay-mode'}, 'Replay'),
        freeItem
    ])

    const ICON_SETTINGS = require('./icons/settings.svg')
    const settingsButton = button({class: 'button settings'})
    settingsButton.node.innerHTML = ICON_SETTINGS
    settingsButton.on('click', () => {
        if (menu.node.style.display === 'block') {
            menu.node.style.display = 'none'
        } else {
            menu.node.style.display = 'block'
        }
    })

    const settings = div({class: 'settings'}, [
        menu,
        settingsButton
    ])

    return settings
}

class ReplayMode extends Component {
    node: HTMLElement
    private ui: UI
    private game: Game

    private onPlayerChange: () => void

    constructor(ui: UI) {
        super()

        let game = ui.game
        this.ui = ui
        this.game = game

        let root = DOM.find(this.ui.getNode(), '.style-wrapper')

        let controls = div({class: 'controls'}, [
            progressBar(game),
            div({class: 'buttons'}, [
                div({class: 'left-buttons'}, [
                    speedDownButton(game),
                    playButton(game),
                    speedUpButton(game),
                    volumeControl(game),
                    replayTime(game)
                ]),
                div({class: 'right-buttons'}, [
                    settingsComponent(),
                    fullscreenButton(ui)
                ])
            ])
        ])

        root.appendChild(controls.node)

        game.mode = Game.MODE_REPLAY

        // keyboard shortcuts
        window.addEventListener('keydown', (e) => {
            if (!this.ui.isFocused()) {
                return
            }

            if (game.mode === Game.MODE_REPLAY) {
                switch (e.which) {
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
                        let volume = game.soundSystem.getVolume()
                        game.soundSystem.setVolume(volume + 0.05)
                        break
                    }
                    case 40: { // down arrow
                        let volume = game.soundSystem.getVolume()
                        game.soundSystem.setVolume(volume - 0.05)
                        break
                    }
                    case 77: { // M
                        game.soundSystem.toggleMute()
                        break
                    }
                }
            }
        })

        this.node = controls.node
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
