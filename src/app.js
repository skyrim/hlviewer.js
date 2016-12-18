import xhr from './xhr.js'
import Map from './map.js'
import Replay, {ReplayBuilder} from './replay.js'
import Promise from 'bluebird'
let THREE = require('three')

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

        Promise.resolve()
        /*.then(() => xhr({url: replay.replayUrl, isBinary: true}))
        .then((response) => {
            replayObject = ReplayBuilder.fromArrayBuffer(response)
            console.log(replayObject)
        })*/
        .then(() => xhr({url: replay.mapUrl, isBinary: true}))
        .then((response) => {
            mapObject = new Map(response)
            console.log(mapObject);

            ((game, map) => {
                /* setup scene for three.js */

                let resizeTexture = (pixels, width, height, newWidth, newHeight) => {
                    let canvas = document.createElement('canvas');
                    let ctx = canvas.getContext('2d');
                    canvas.width = width;
                    canvas.height = height;

                    let nc = document.createElement('canvas');
                    let nctx = nc.getContext('2d');
                    nc.width = newWidth;
                    nc.height = newHeight;

                    let cid = ctx.createImageData(width, height);
                    for (let i = 0, size = width * height * 4; i < size; i += 4) {
                        cid.data[i] = pixels[i];
                        cid.data[i + 1] = pixels[i + 1];
                        cid.data[i + 2] = pixels[i + 2];
                        cid.data[i + 3] = pixels[i + 3];
                    }
                    ctx.putImageData(cid, 0, 0);

                    nctx.drawImage(canvas, 0, 0, newWidth, newHeight);

                    return new Uint8Array(nctx.getImageData(0, 0, newWidth, newHeight).data);
                }

                let isPowerOfTwo = (n) => ((n & (n - 1)) === 0)

                let nextPowerOfTwo = (n) => {
                    --n;
                    for (let i = 1; i < 32; i <<= 1) {
                        n = n | n >> i;
                    }
                    return n + 1;
                }

                let materials = []
                for (let i = 0; i < map.textures.length; ++i) {
                    let texture
                    if (map.textures[i].mipmaps.length > 0) {
                        if (!isPowerOfTwo(map.textures[i].width) || !isPowerOfTwo(map.textures[i].height)) {
                            let nw = nextPowerOfTwo(map.textures[i].width)
                            let nh = nextPowerOfTwo(map.textures[i].height)
                            let pixels = resizeTexture(map.textures[i].mipmaps[0], map.textures[i].width, map.textures[i].height, nw, nh)
                            map.textures[i].mipmaps[0] = pixels
                            map.textures[i].width = nw
                            map.textures[i].height = nh
                        }

                        texture = new THREE.DataTexture(new Uint8Array(map.textures[i].mipmaps[0]), map.textures[i].width, map.textures[i].height, THREE.RGBAFormat)
                        texture.name = map.textures[i].name
                        texture.magFilter = THREE.LinearFilter;
                        texture.minFilter = THREE.LinearFilter;
                        texture.anisotropy = game.renderer.getMaxAnisotropy()
                    }
                    else {
                        let pixels = [255, 255, 255, 255, /**/ 255, 128,   0, 255,
                                      255, 128,   0, 255, /**/ 255, 255, 255, 255]
                        texture = new THREE.DataTexture(new Uint8Array(pixels), 2, 2, THREE.RGBAFormat)
                        texture.magFilter = THREE.NearestFilter;
                        texture.minFilter = THREE.NearestFilter;
                    }
                    texture.wrapS = THREE.RepeatWrapping;
                    texture.wrapT = THREE.RepeatWrapping;
                    texture.repeat.y = -1;
                    texture.needsUpdate = true;

                    materials.push(new THREE.MeshLambertMaterial({map: texture, transparent: true, alphaTest: 0.75}))
                }

                let meshes = []
                for (let i = 0; i < map.models.length; ++i) {
                    let model = map.models[i]

                    let geometry = new THREE.Geometry()

                    let vertices = model.vertices
                    for (let j = 0; j < vertices.length; ++j) {
                        geometry.vertices.push(new THREE.Vector3(vertices[j][0], vertices[j][1], vertices[j][2]))
                    }

                    let faces = model.faces
                    for (let j = 0; j < faces.length; ++j) {
                        let materialIndex = model.textureIndices[j]
                        if (materials[materialIndex].map.name === 'aaatrigger') {
                            continue
                        }

                        let face = new THREE.Face3(faces[j][0], faces[j][1], faces[j][2])
                        face.materialIndex = materialIndex
                        geometry.faces.push(face)

                        let width = materials[face.materialIndex].map.image.width
                        let height = materials[face.materialIndex].map.image.height
                        geometry.faceVertexUvs[0].push([
                            new THREE.Vector2(model.uv[j][0][0], model.uv[j][0][1]  * -1),
                            new THREE.Vector2(model.uv[j][1][0], model.uv[j][1][1]  * -1),
                            new THREE.Vector2(model.uv[j][2][0], model.uv[j][2][1]  * -1)
                        ])
                    }

                    if (geometry.faces.length === 0) {
                        continue
                    }

                    let material = (new THREE.MultiMaterial(materials)).clone()
                    let mesh = new THREE.Mesh(geometry, material)
                    let entity = map.entities.find(e => e.model === i)
                    if (entity && entity.rendermode) {
                        if (typeof entity.renderamt === 'number' && entity.renderamt < 255) {
                            mesh.material.materials.forEach(m => {
                                mesh.renderOrder = 1
                                m.depthWrite = false
                                m.alphaTest = 0.05
                                m.opacity = entity.renderamt / 255
                            })
                        }

                        if (entity.rendermode === 5) {
                            mesh.material.materials.forEach(m => {
                                m.blending = THREE.AdditiveBlending
                                m.depthWrite = false
                                m.opacity = 0.9
                            })
                        }
                    }

                    meshes.push(mesh)
                }

                let light = new THREE.AmbientLight(0xdddddd)
                let lightEntity = map.entities.find(e => e.classname === 'light_environment')
                if (lightEntity) {
                    light.intensity = lightEntity._light[3] / 255
                }
                game.scene.add(light)

                for (let i = 0; i < meshes.length; ++i) {
                    game.scene.add(meshes[i])
                }
            })(this.game, mapObject)
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
        this.camera.position.x = 0
        this.camera.position.y = 0
        this.camera.rotation.x = 1.57;

        this.scene = new THREE.Scene()

        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            stencil: false
        })
        this.renderer.autoClearColor = false
        this.renderer.autoClearStencil = false
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setSize(this.width, this.height)

        this.draw.bind(this)()
    }

    draw() {
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

        this.renderer.render(this.scene, this.camera)

        requestAnimationFrame(this.draw.bind(this))
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
        xhr({url: 'replays.json'}).then((response) => {
            try {
                let replays = JSON.parse(response)
                this.ui.addReplaysToList(replays)
            } catch (e) {
                console.error(e)
            }
        })
    }
}