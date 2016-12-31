import Map from './map.js'
import Wad from './wad.js'
import Replay from './replay.js'

let ui_template =
`<div id="hlv">
    <ul id="hlv-replays">
        <li id="hlv-replays-title">Replays:</li>
    </ul>
    <div id="hlv-loading">LOADING BOX</div>
    <div id="hlv-controls">
        <div id="hlv-controls-left">
            <div id="hlv-controls-play" class="button">&#9654;</div>
            <div id="hlv-controls-pause" class="button">&#10074;&#10074;</div>
            <div id="hlv-controls-stop" class="button">&#9632;</div>
        </div>
        <div id="hlv-controls-right">
            <div id="hlv-controls-fullscreen" class="button">&#x1f865;</div>
        </div>
    </div>
    <div id="hlv-screen"></div>
</div>`

let ui_style =
`#hlv {position:relative; width:100%; height:100%; font-family:"Calibri", sans-serif, arial; color:#fff}
#hlv-replays {position:absolute; list-style:none; margin:0; padding:0; top:20px; left:20px; background:#333}
#hlv-replays > #hlv-replays-title {font-weight:bold}
#hlv-replays > #hlv-replays-title:hover {background:#999}
#hlv-replays > li {padding:4px; margin:4px; background:#999}
#hlv-replays > li:hover {background:#666}
#hlv-replays > li > a {color:#fff}
#hlv-replays > li.active {background:#666}

#hlv-controls {position:absolute; bottom:0; left:0; right:0; height:40px; background:#333; user-select:none}
#hlv-controls > div > div {display:inline-block; line-height:36px; width:40px; text-align:center; font-size:16pt;}
#hlv-controls > div > div:hover {color:#0f0}
#hlv-controls > #hlv-controls-left {float:left}
#hlv-controls > #hlv-controls-right {float:right}
#hlv-controls .button {cursor:pointer}
#hlv-controls #hlv-controls-stop {font-size:24pt;}
#hlv-controls #hlv-controls-fullscreen {font-size:20pt; line-height:42px}

#hlv-loading {position:absolute; top:20px; left:50%; margin-left:-120px; height:60px; width:240px; background:#333; text-align:center}

#hlv-screen {position:absolute; top:0; left:0; width:100%; height:100%; z-index:-1}`

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
    constructor(root, game) {
        root.appendChild(createDomFromHtml(ui_template))
        this.dom = {
            root: document.getElementById('hlv-ui'),
            replaysList: document.getElementById('hlv-replays'),
            screen: document.getElementById('hlv-screen')
        }
        this.dom.screen.appendChild(game.renderer.domElement)
        addStyleToDom(ui_style)
        this.game = game
        this.replays = []
        this.currentReplay = null
    }

    addReplaysToList(replays) {
        // TODO: check replay array object structure?

        for (let i = 0; i < replays.length; ++i) {
            let replay = replays[i]
            let html = `<li><a href="#" style="display:block">${replay.name}</a></li>`
            let element = createDomFromHtml(html)
            element.addEventListener('click', (event) => {
                this.onClickReplay(replay, element)
                event.preventDefault()
            })
            this.dom.replaysList.appendChild(element)
        }

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

        let replayObject
        let mapObject

        let promise = Promise.resolve()
        if (replay.replayUrl) {
            promise.then(() => Replay.loadFromUrl(replay.replayUrl))
            .then((replay) => replayObject = replay)
        }

        promise.then(() => Map.loadFromUrl(replay.mapUrl))
        .then((map) => {
            mapObject = map
            if (map.hasMissingTextures()) {
                let promises = map.entities[0].wad.map(w => Wad.loadFromUrl(`res/wads/${w}`, {isBinary: true})
                    .then(w => {
                        for (let i = 0; i < w.entries.length; ++i) {
                            for (let j = 0; j < map.textures.length; ++j) {
                                if (w.entries[i].name.toLowerCase() === map.textures[j].name.toLowerCase()) {
                                    map.textures[j].mipmaps = w.entries[i].data.texture.mipmaps
                                }
                            }
                        }
                    }))
                return Promise.all(promises)
            }
            return Promise.resolve()
        })
        .then(() => {
            let startEntity = mapObject.entities.find(e => e.classname === 'info_player_start')
            if (startEntity) {
                this.game.camera.position.x = startEntity.origin[0]
                this.game.camera.position.y = startEntity.origin[1]
                this.game.camera.position.z = startEntity.origin[2]
            }
            
            this.game.worldScene.changeMap(mapObject)
            this.game.skyScene.change()
        })
    }
}