import Map from './map'
import Wad from './wad'
import Replay from './replay'

let ui_play_btn =
`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' fill='currentcolor'>
    <path d='M0 0 L0 64 L64 32 Z' />
</svg>`

let ui_pause_btn =
`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' fill='currentcolor'>
    <path d='M0 0 L0 64 L20 64 L20 0 M44 0 L64 0 L64 64 L44 64 Z' />
</svg>`

let ui_stop_btn =
`<svg viewBox="0 0 1 1" fill="currentcolor">
    <rect width="1" height="1" />
</svg>`

let ui_fullscreen_btn =
`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' fill='currentcolor'>
    <path d='M0 22 L8 22 L8 8 L22 8 L22 0 L0 0 M42 0 L42 8 L56 8 L56 22 L64 22 L64 0 M0 64 L0 42 L8 42 L8 56 L22 56 L22 64 M64 64 L42 64 L42 56 L56 56 L56 42 L64 42 Z' />
</svg> `

let ui_template =
`<div class="hlv">
    <ul class="hlv-loading"></ul>
    <div class="hlv-controls">
        <div class="hlv-controls-left">
            <div class="hlv-controls-play button">${ui_play_btn}</div>
            <div class="hlv-controls-stop button">${ui_stop_btn}</div>
        </div>
        <div class="hlv-controls-right">
            <div class="hlv-controls-fullscreen button">
                ${ui_fullscreen_btn}
            </div>
        </div>
    </div>
    <div class="hlv-screen"></div>
</div>`

let ui_style =
`.hlv {
    position:relative;
    width:100%;
    height:100%;
    font-family:"Calibri",sans-serif,arial;
    color:#fff
}
.hlv-controls {
    position:absolute;
    bottom:0;
    left:0;
    right:0;
    height:40px;
    background:#333;
    user-select:none;
}
.hlv-controls > div > div {
    display:inline-block;
    line-height:36px;
    width:40px;
    text-align:center;
    font-size:16pt;
}
.hlv-controls > div > div:hover {
    color:#fc0
}
.hlv-controls > .hlv-controls-left {
    float:left
}
.hlv-controls-play {
    visibility:hidden
}
.hlv-controls-stop {
    visibility:hidden
}
.hlv-controls > .hlv-controls-right {
    float:right;
}
.hlv-controls .button {
    cursor:pointer;
    width:20px;
    margin:5px 8px 0
}

.hlv > .hlv-loading {
    position:absolute;
    top:16px;
    right:16px;
    background:#333;
    display:none;
    list-style:none;
    padding:5px;
    font-family:monospace;
}

.hlv-screen {
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    z-index:-1
}`

let createDomFromHtml = (html) => {
    let tempNode = document.createElement('div')
    tempNode.innerHTML = html.trim()
    if (tempNode.children.length === 1) {
        return tempNode.firstChild
    } else {
        return tempNode.children
    }
}

let addStyleToDom = (style) => {
    let element = document.createElement('style')
    let textNode = document.createTextNode(style)
    element.appendChild(textNode)
    document.head.appendChild(element)
}

export default class UI {
    constructor(target, game) {
        target.appendChild(createDomFromHtml(ui_template))

        this.buttons = {
            play:       createDomFromHtml(ui_play_btn),
            pause:      createDomFromHtml(ui_pause_btn),
            stop:       createDomFromHtml(ui_stop_btn),
            fullscreen: createDomFromHtml(ui_fullscreen_btn)
        }

        this.dom = {}
        this.dom.root       = target.querySelector('.hlv'),
        this.dom.screen     = this.dom.root.querySelector('.hlv-screen'),
        this.dom.loading    = this.dom.root.querySelector('.hlv-loading'),
        this.dom.controls   = this.dom.root.querySelector('hlv-controls'),
        this.dom.play       = this.dom.root.querySelector('.hlv-controls-play'),
        this.dom.stop       = this.dom.root.querySelector('.hlv-controls-stop'),
        this.dom.fullscreen = this.dom.root.querySelector('.hlv-controls-fullscreen')
        this.dom.screen.appendChild(game.getCanvas())

        addStyleToDom(ui_style)

        this.game = game
        this.currentReplay = null
        this.isFullscreen = false

        this.dom.play.addEventListener('click', () => {
            if (!this.game.player) {
                return
            }

            this.game.player.play()
            this.dom.play.removeChild(this.dom.play.children[0])
            if (this.game.player.isPlaying) {
                if (this.game.player.isPaused) {
                    this.dom.play.appendChild(this.buttons.play)
                } else {
                    this.dom.play.appendChild(this.buttons.pause)
                }
            }
        })
        this.dom.stop.addEventListener('click', () => {
            if (!this.game.player) {
                return
            }

            this.game.player.stop()
            this.dom.play.removeChild(this.dom.play.children[0])
            this.dom.play.appendChild(this.buttons.play)
        })
        document.addEventListener('fullscreenchange', () => {
            this.isFullscreen = document.fullscreen
        }, false)
        document.addEventListener('mozfullscreenchange', () => {
            this.isFullscreen = document.mozFullScreen
        }, false)
        document.addEventListener('webkitfullscreenchange', () => {
            this.isFullscreen = document.webkitIsFullScreen
        }, false)
        document.addEventListener('msfullscreenchange', () => {
            this.isFullscreen = document.msFullscreenElement
        }, false)
        this.dom.fullscreen.addEventListener('click', () => {
            let r = this.dom.root
            if (this.isFullscreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen()
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen()
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen()
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen()
                }
            } else {
                if (r.requestFullscreen) {
                    r.requestFullscreen()
                } else if (r.mozRequestFullScreen) {
                    r.mozRequestFullScreen()
                } else if (r.webkitRequestFullScreen) {
                    r.webkitRequestFullScreen()
                } else if (r.msRequestFullscreen) {
                    r.msRequestFullscreen()
                }
            }
        })
    }

    showReplayControls() {
        this.dom.play.style.visibility = 'visible'
        this.dom.stop.style.visibility = 'visible'
    }

    hideReplayControls() {
        this.dom.play.style.visibility = 'hidden'
        this.dom.stop.style.visibility = 'hidden'
    }

    showLoadingBox() {
        this.dom.loading.style.display = 'initial'
    }

    hideLoadingBox() {
        this.dom.loading.style.display = 'none'
    }

    clearLoadingBox() {
        this.dom.loading.innerHTML = ''
    }
}