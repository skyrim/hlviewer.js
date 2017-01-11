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
`<!-- Generated with http://jxnblk.com/paths -->
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' fill='currentcolor'>
    <path d='M0 22 L8 22 L8 8 L22 8 L22 0 L0 0 M42 0 L42 8 L56 8 L56 22 L64 22 L64 0 M0 64 L0 42 L8 42 L8 56 L22 56 L22 64 M64 64 L42 64 L42 56 L56 56 L56 42 L64 42 Z' />
</svg> `

let ui_template =
`<div id="hlv">
    <ul id="hlv-replays">
        <li id="hlv-replays-title">Replays:</li>
    </ul>
    <ul id="hlv-loading"></ul>
    <div id="hlv-controls">
        <div id="hlv-controls-left">
            <div id="hlv-controls-play" class="button">${ui_play_btn}</div>
            <div id="hlv-controls-stop" class="button">${ui_stop_btn}</div>
        </div>
        <div id="hlv-controls-right">
            <div id="hlv-controls-fullscreen" class="button">
                ${ui_fullscreen_btn}
            </div>
        </div>
    </div>
    <div id="hlv-screen"></div>
</div>`

let ui_style =
`#hlv {
    position:relative;
    width:100%;
    height:100%;
    font-family:"Calibri",sans-serif,arial;
    color:#fff
}
#hlv-replays {
    position:absolute;
    list-style:none;
    margin:0;
    padding:0;
    top:20px;
    left:20px;
    background:#333
}
#hlv-replays > #hlv-replays-title {
    font-weight:bold
}
#hlv-replays > #hlv-replays-title:hover {
    background:#999
}
#hlv-replays > li {
    padding:4px;
    margin:4px;
    background:#999
}
#hlv-replays > li:hover {
    background:#666
}
#hlv-replays > li > a {
    color:#fff
}
#hlv-replays > li.active {
    background:#666
}

#hlv-controls {
    position:absolute;
    bottom:0;
    left:0;
    right:0;
    height:40px;
    background:#333;
    user-select:none;
    display:none
}
#hlv-controls > div > div {
    display:inline-block;
    line-height:36px;
    width:40px;
    text-align:center;
    font-size:16pt;
}
#hlv-controls > div > div:hover {
    color:#fc0
}
#hlv-controls > #hlv-controls-left {
    float:left
}
#hlv-controls > #hlv-controls-right {
    float:right;
    display:none
}
#hlv-controls .button {
    cursor:pointer;
    width:22px;
    margin:6px 8px 0
}

#hlv-loading {
    position:absolute;
    top:16px;
    right:16px;
    background:#333;
    display:none;
    list-style:none;
    padding:5px;
    font-family:monospace;
}

#hlv-screen {
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

let formatLoadingItem = (url, progress) => {
    progress = Math.round(progress * 100).toString()
    let length = 59 - url.length - progress.length
    if (length < 2) {
        url = url.substr(0, 50)
        length = 9 - progress.length
    }
    let dots = Array(length).join('.')
    return `${url}${dots}${progress}%`
}

let loadReplay = (url, loadingBox) => {
    let text = `<li>${formatLoadingItem(url, 0)}</li>`
    let loadText = createDomFromHtml(text)
    loadingBox.appendChild(loadText)
    return Replay.loadFromUrl(url, (r, progress) => {
        loadText.innerHTML = formatLoadingItem(url, progress)
    })
}

let loadMap = (url, loadingBox) => {
    let text = `<li>${formatLoadingItem(url, 0)}</li>`
    let loadText = createDomFromHtml(text)
    loadingBox.appendChild(loadText)
    return Map.loadFromUrl(url, (r, progress) => {
        loadText.innerHTML = formatLoadingItem(url, progress)
    })
}

let mergeWadAndMapTextures = (wad, map) => {
    let cmp = (a, b) => a.toLowerCase() === b.toLowerCase()
    wad.entries.forEach(entry => {
        map.textures.forEach(texture => {
            if (cmp(entry.name, texture.name)) {
                texture.mipmaps = entry.data.texture.mipmaps
            }
        })
    })
}

let loadWad = (url, map, loadingBox) => {
    let text = `<li>${formatLoadingItem(url, 0)}</li>`
    let loadText = createDomFromHtml(text)
    loadingBox.appendChild(loadText)
    return Wad.loadFromUrl(url, (r, progress) => {
            loadText.innerHTML = formatLoadingItem(url, progress)
        })
        .then(wad => mergeWadAndMapTextures(wad, map))
}

export default class UI {
    constructor(root, game) {
        root.appendChild(createDomFromHtml(ui_template))

        this.buttons = {
            play: createDomFromHtml(ui_play_btn),
            pause: createDomFromHtml(ui_pause_btn),
            stop: createDomFromHtml(ui_stop_btn),
            fullscreen: createDomFromHtml(ui_fullscreen_btn)
        }

        this.dom = {
            root: document.getElementById('hlv-ui'),
            replaysList: document.getElementById('hlv-replays'),
            screen: document.getElementById('hlv-screen'),
            loading: document.getElementById('hlv-loading'),
            controls: document.getElementById('hlv-controls'),
            play: document.getElementById('hlv-controls-play'),
            stop: document.getElementById('hlv-controls-stop')
        }
        this.dom.screen.appendChild(game.getCanvas())
        addStyleToDom(ui_style)
        this.game = game
        this.replays = []
        this.currentReplay = null

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
    }

    addReplaysToList(replays) {
        // TODO: check replay array object structure?

        replays.forEach(replay => {
            let html = `<li><a href="#" style="display:block">${replay.name}</a></li>`
            let element = createDomFromHtml(html)
            element.addEventListener('click', (event) => {
                this.onClickReplay(replay, element)
                event.preventDefault()
            })
            this.dom.replaysList.appendChild(element)
        })

        this.replays = this.replays.concat(replays)
    }

    onClickReplay(replay, element) {
        if (this.currentReplay === replay) {
            return
        }
        this.currentReplay = replay

        for (let i = 0; i < this.dom.replaysList.children.length; ++i) {
            this.dom.replaysList.children[i].removeAttribute('class')
        }
        element.setAttribute('class', 'active')
        this.dom.loading.innerHTML = ''
        this.dom.loading.style.display = 'initial'

        let replayObject
        let mapObject

        let promise = Promise.resolve()
        if (replay.replayUrl) {
            this.dom.controls.style.display = 'initial'
            promise = promise
                .then(() => loadReplay(replay.replayUrl, this.dom.loading))
                .then(replay => replayObject = replay)
        } else {
            this.dom.controls.style.display = 'none'
        }

        promise
            .then(() => loadMap(replay.mapUrl, this.dom.loading))
            .then(map => {
                mapObject = map
                if (map.hasMissingTextures()) {
                    let wads = map.entities[0].wad
                    let promises = wads.map(w => loadWad(`res/wads/${w}`, map, this.dom.loading))
                    return Promise.all(promises)
                }
                return Promise.resolve()
            })
            .then(() => this.game.changeMap(mapObject, replayObject))
            .then(() => {
                setTimeout(() => {
                    this.dom.loading.style.display = 'none'
                }, 3000)
            })
    }
}