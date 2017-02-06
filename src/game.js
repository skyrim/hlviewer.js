import EventEmitter from 'events'
import * as THREE from 'three'
import WorldScene from './world-scene'
import SkyScene from './sky-scene'
import ReplayPlayer from './replay-player'
import * as Time from './time'

const KEYS = {
    A: 'A'.charCodeAt(0),
    B: 'B'.charCodeAt(0),
    C: 'C'.charCodeAt(0),
    D: 'D'.charCodeAt(0),
    E: 'E'.charCodeAt(0),
    F: 'F'.charCodeAt(0),
    G: 'G'.charCodeAt(0),
    H: 'H'.charCodeAt(0),
    I: 'I'.charCodeAt(0),
    J: 'J'.charCodeAt(0),
    K: 'K'.charCodeAt(0),
    L: 'L'.charCodeAt(0),
    M: 'M'.charCodeAt(0),
    N: 'N'.charCodeAt(0),
    O: 'O'.charCodeAt(0),
    P: 'P'.charCodeAt(0),
    Q: 'Q'.charCodeAt(0),
    R: 'R'.charCodeAt(0),
    S: 'S'.charCodeAt(0),
    T: 'T'.charCodeAt(0),
    U: 'U'.charCodeAt(0),
    V: 'V'.charCodeAt(0),
    W: 'W'.charCodeAt(0),
    X: 'X'.charCodeAt(0),
    Y: 'Y'.charCodeAt(0),
    Z: 'Z'.charCodeAt(0)
}

export default class Game {
    constructor() {
        this.lastTime = 0
        this.accumTime = 0
        this.timeStep = 1 / 60

        this.mouse = {
            click: false,
            leftClick: false,
            rightClick: false,
            position: [0, 0],
            delta: [0, 0]
        }

        this.keyboard = {
            key: new Uint8Array(256)
        }
        for (let i = 0; i < this.keyboard.key.length; ++i) {
            this.keyboard.key[i] = false
        }

        window.addEventListener('mousedown', this.mousedown.bind(this))
        window.addEventListener('mouseup',   this.mouseup.bind(this))
        window.addEventListener('mousemove', this.mousemove.bind(this))
        window.addEventListener('keydown',   this.keydown.bind(this))
        window.addEventListener('keyup',     this.keyup.bind(this))

        this.camera = new THREE.PerspectiveCamera(70, 1, 1, 100000)
        this.camera.rotation.order = 'ZXY'
        this.camera.rotation.x = 1.57;
        this.camera.position.y = 0

        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: false,
            stencil: false
        })
        this.renderer.autoClear = false
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setSize(this.width, this.height)

        this.worldScene = new WorldScene(this.renderer)
        this.skyScene = new SkyScene(this.renderer)

        this.entities = []

        this.selectedObject = null
        this.selectedObjectBox = null

        this.mode = Game.MODE_FREE

        this.player = new ReplayPlayer({frames:[{}], meta:{}})
        this.events = new EventEmitter()

        this.mapName = ''

        this.draw.bind(this)()
    }

    getCanvas() {
        return this.renderer.domElement
    }

    changeMap(map, mapName) {
        this.events.emit('premapchange', this, map, mapName)

        if (this.mapName.toLowerCase() !== mapName.toLowerCase()) {
            this.mapName = mapName
            this.worldScene.change(map)
            if (map.skies.length === 6) {
                this.skyScene.change(map.skies)
            }

            this.entities.length = 0
            map.entities.forEach(e => this.entities.push(e))
            this.worldScene
                .getMeshes()
                .forEach((mesh, i) => {
                    if (i === 0) {
                        this.entities[0].mesh = mesh
                    }
                    else {
                        let entity = this.entities.find(e => e.model === i)
                        if (entity) {
                            entity.mesh = mesh
                        }
                    }
                })

            let startEntity = map.entities
                .find(e => e.classname === 'info_player_start')
            if (startEntity) {
                this.camera.position.x = startEntity.origin[0]
                this.camera.position.y = startEntity.origin[1]
                this.camera.position.z = startEntity.origin[2]
            }
            this.camera.rotation.x = Math.PI / 2
            this.camera.rotation.z = 0

            if (!this.replay
                || (this.replay.mapName.toLowerCase() !== mapName.toLowerCase())) {
                this.replay = null
                this.player = new ReplayPlayer({frames:[{}], meta:{}})
            }
        }

        this.events.emit('postmapchange', this, map, mapName)
    }

    changeReplay(replay) {
        this.events.emit('prereplaychange', this, replay)

        this.replay = replay
        
        let events = this.player.events
        this.player = ReplayPlayer.createFromReplay(replay)
        this.player.events = events

        this.events.emit('postreplaychange', this, replay)
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

        let currTime = Time.now() / 1000
        let dt = currTime - this.lastTime
        this.accumTime += dt

        while (this.accumTime > this.timeStep) {
            this.update(this.timeStep)
            this.accumTime -= this.timeStep
        }
        
        this.skyScene.draw(this.camera, dt)
        this.worldScene.draw(this.camera, dt)

        this.lastTime = currTime
    }

    update(dt) {
        this.events.emit('preupdate', this)

        let camera = this.camera
        let keyboard = this.keyboard
        let mouse = this.mouse

        if (this.mode === Game.MODE_REPLAY) {
            if (this.player.isPlaying) {
                this.player.update(dt)
            }

            let frame = this.player.getFrame()
            if (frame) {
                if (frame.position && frame.rotation) {
                    this.camera.position.x = frame.position[0]
                    this.camera.position.y = frame.position[1]
                    this.camera.position.z = frame.position[2]
                    this.camera.rotation.x = (90 - frame.rotation[0]) * 0.0174;
                    this.camera.rotation.z = (0.0174 * frame.rotation[1]) - 1.57;
                }
            } else {
                this.player.stop()
            }
        } else if (this.mode === Game.MODE_FREE) {
            if (mouse.click) {
                let mX = mouse.delta[1] / 100
                let mY = mouse.delta[0] / 100

                let x = Math.max(0.05, Math.min(3.09, camera.rotation.x - mX))
                let y = camera.rotation.z - mY

                camera.rotation.x = x
                camera.rotation.z = y
            }

            const speed = 500
            if (keyboard.key[KEYS.W] !== keyboard.key[KEYS.S]) {
                if (keyboard.key[KEYS.W]) {
                    camera.position.y += Math.cos(camera.rotation.z) * speed * dt
                    camera.position.x -= Math.sin(camera.rotation.z) * speed * dt
                } else if (keyboard.key[KEYS.S]) {
                    camera.position.y += Math.cos(camera.rotation.z - 3.14) * speed * dt
                    camera.position.x -= Math.sin(camera.rotation.z - 3.14) * speed * dt
                }
            }

            if (keyboard.key[KEYS.A] !== keyboard.key[KEYS.D]) {
                if (keyboard.key[KEYS.A]) {
                    camera.position.y += Math.cos(camera.rotation.z + 1.57) * speed * dt
                    camera.position.x -= Math.sin(camera.rotation.z + 1.57) * speed * dt
                } else if (keyboard.key[KEYS.D]) {
                    camera.position.y += Math.cos(camera.rotation.z - 1.57) * speed * dt
                    camera.position.x -= Math.sin(camera.rotation.z - 1.57) * speed * dt
                }
            }

            if (keyboard.key[KEYS.R] !== keyboard.key[KEYS.F]) {
                if (keyboard.key[KEYS.R]) {
                    camera.position.z += speed * dt
                } else if (keyboard.key[KEYS.F]) {
                    camera.position.z -= speed * dt
                }
            }
        }

        mouse.delta[0] = 0
        mouse.delta[1] = 0

        this.events.emit('postupdate', this)
    }

    mousedown(e) {
        this.mouse.click = true

        let selectObject = (mesh) => {
            mesh.material.materials.forEach(m => m.color.set(0xff0000))
            this.selectedObject = mesh

            this.selectedObjectBox = new THREE.BoxHelper(mesh, 0x00ff00)
            this.worldScene.scene.add(this.selectedObjectBox)

            let entity = this.entities.find(e => e.mesh === mesh)
            console.log(entity)
        }

        let deselectObject = (mesh) => {
            mesh.material.materials.forEach(m => m.color.set(0xffffff))
            this.selectedObject = null

            this.worldScene.scene.remove(this.selectedObjectBox)
            this.selectedObjectBox = null
        }

        if (!(this.player && this.player.isPlaying) && this.keyboard.key[17]) {
            let ray = new THREE.Raycaster()
            let mouse = new THREE.Vector2()

            let rect = this.renderer.domElement.getBoundingClientRect()
            if (e.clientX >= rect.left && e.clientX <= rect.right
                && e.clientY >= rect.top && e.clientY <= rect.bottom) {

                mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
                mouse.y = - ((e.clientY - rect.top) / rect.height) * 2 + 1
                
                ray.setFromCamera(mouse, this.camera)
                let objects = ray.intersectObjects(this.worldScene.getMeshes())
                let mesh = objects[0] ? objects[0].object : null
                if (mesh && this.selectedObject !== mesh) {
                    if (this.selectedObject) {
                        deselectObject(this.selectedObject)
                    }
                    selectObject(mesh)
                } else if (this.selectedObject) {
                    deselectObject(this.selectedObject)
                }
            }
        }
    }

    mouseup() {
        this.mouse.click = false
    }

    mousemove(e) {
        this.mouse.delta[0] = e.pageX - this.mouse.position[0]
        this.mouse.delta[1] = e.pageY - this.mouse.position[1]

        this.mouse.position[0] = e.pageX
        this.mouse.position[1] = e.pageY
    }

    keydown(e) {
        this.keyboard.key[e.which] = true
    }

    keyup(e) {
        this.keyboard.key[e.which] = false
    }
}

Game.MODE_FREE = 0
Game.MODE_REPLAY = 1