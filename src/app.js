import Promise from 'bluebird'
import * as THREE from 'three'
import xhr from './xhr.js'
import Map from './map.js'
import Wad from './wad.js'
import Replay from './replay.js'
import WorldScene from './world-scene.js'
import SkyScene from './sky-scene.js'

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

class UI {
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

        /*Replay.loadFromUrl(replay.replayUrl)
        .then((replay) => {replayObject = replay})
        .then(() => */Map.loadFromUrl(replay.mapUrl)/*)*/
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

class Game {
    constructor() {
        let initControls = (() => {
            this.mouse = {
                click: false,
                leftClick: false,
                rightClick: false,
                position: [0, 0],
                delta: [0, 0]
            }

            this.keyboard = {
                key: new Array(256)
            }
            for (let i = 0; i < this.keyboard.key.length; ++i) {
                this.keyboard.key[i] = false
            }

            window.addEventListener('mousedown', this.mousedown.bind(this))
            window.addEventListener('mouseup',   this.mouseup.bind(this))
            window.addEventListener('mousemove', this.mousemove.bind(this))
            window.addEventListener('keydown',   this.keydown.bind(this))
            window.addEventListener('keyup',     this.keyup.bind(this))
        })()

        this.camera = new THREE.PerspectiveCamera(70, 1, 1, 100000)
        this.camera.rotation.order = 'ZXY'
        this.camera.rotation.x = 1.57;
        this.camera.position.y = 0

        this.worldScene = new WorldScene()
        this.skyScene = new SkyScene()

        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            stencil: false
        })
        this.renderer.autoClear = false
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setSize(this.width, this.height)

        this.draw.bind(this)()
    }

    draw() {
        requestAnimationFrame(this.draw.bind(this))

        let canvas = this.renderer.domElement
        let parent = canvas.parentNode
        if (parent) {
            let pw = parent.clientWidth
            let ph = parent.clientHeight
            if (canvas.width !== pw || canvas.height !== ph) {
                this.camera.aspect = pw / ph
                this.camera.updateProjectionMatrix()
                this.renderer.setSize(pw, ph)
            }
        }

        this.update()
        
        this.renderer.clear()
        this.skyScene.draw(this.renderer, this.camera)
        this.worldScene.draw(this.renderer, this.camera)
    }

    update() {
        if (this.mouse.click) {
            var mX = this.mouse.delta[1] / 100;
            var mY = this.mouse.delta[0] / 100;

            var x = this.camera.rotation.x - mX;
            x = Math.max(0.05, Math.min(3.09, x));
            var y = this.camera.rotation.z - mY;

            this.camera.rotation.x = x;
            this.camera.rotation.z = y;
            let a = document.querySelector('#hlv-loading')
            if (a) {
                a.innerHTML = `X: ${this.camera.rotation.x}<br>Y: ${this.camera.rotation.y}<br>Z: ${this.camera.rotation.z}`
            }
        }

        if (this.keyboard.key['W'.charCodeAt(0)] !== this.keyboard.key['S'.charCodeAt(0)]) {
            if (this.keyboard.key['W'.charCodeAt(0)]) {
                this.camera.position.y += Math.cos(this.camera.rotation.z) * 10;
                this.camera.position.x -= Math.sin(this.camera.rotation.z) * 10;
            }
            else if (this.keyboard.key['S'.charCodeAt(0)]) {
                this.camera.position.y += Math.cos(this.camera.rotation.z - 3.14) * 10;
                this.camera.position.x -= Math.sin(this.camera.rotation.z - 3.14) * 10;
            }
        }

        if (this.keyboard.key['A'.charCodeAt(0)] !== this.keyboard.key['D'.charCodeAt(0)]) {
            if (this.keyboard.key['A'.charCodeAt(0)]) {
                this.camera.position.y += Math.cos(this.camera.rotation.z + 1.57) * 10;
                this.camera.position.x -= Math.sin(this.camera.rotation.z + 1.57) * 10;
            }
            else if (this.keyboard.key['D'.charCodeAt(0)]) {
                this.camera.position.y += Math.cos(this.camera.rotation.z - 1.57) * 10;
                this.camera.position.x -= Math.sin(this.camera.rotation.z - 1.57) * 10;
            }
        }

        if (this.keyboard.key['R'.charCodeAt(0)] !== this.keyboard.key['F'.charCodeAt(0)]) {
            if (this.keyboard.key['R'.charCodeAt(0)]) {
                this.camera.position.z += 10;
            }
            else if (this.keyboard.key['F'.charCodeAt(0)]) {
                this.camera.position.z -= 10;
            }
        }

        this.mouse.delta[0] = 0;
        this.mouse.delta[1] = 0;
    }

    mousedown(e) {
        e.preventDefault();

        this.mouse.click = true;
    }

    mouseup(e) {
        e.preventDefault();

        this.mouse.click = false;
    }

    mousemove(e) {
        e.preventDefault();

        this.mouse.delta[0] = e.pageX - this.mouse.position[0];
        this.mouse.delta[1] = e.pageY - this.mouse.position[1];

        this.mouse.position[0] = e.pageX;
        this.mouse.position[1] = e.pageY;
    }

    keydown(e) {
        this.keyboard.key[e.which] = true;
    }

    keyup(e) {
        this.keyboard.key[e.which] = false;
    }
}

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