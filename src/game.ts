import { EventEmitter } from 'events'
import * as THREE from 'three'
import { Array } from './array'
import { Entities } from './entities'
import { Keyboard } from './keyboard'
import { Loader } from './loader'
import { Mouse } from './mouse'
import { ReplayPlayer } from './replayplayer'
import { Resources } from './resources'
import { SkyScene } from './sky-scene'
import { SoundSystem } from './sound-system'
import * as Time from './time'
import { WorldScene } from './world-scene'

let checkWebGLSupport = () => {
    const MESSAGES = {
        BAD_BROWSER: 'Your browser does not seem to support WebGL',
        BAD_GPU: 'Your graphics card does not seem to support WebGL'
    }

    let wnd: any = window
    if (!wnd.WebGLRenderingContext) {
        return {
            hasSupport: false,
            message: MESSAGES.BAD_BROWSER
        }
    }

    let c = document.createElement('canvas')
    try {
        let ctx = (c.getContext('webgl') || c.getContext('experimental-webgl'))
        if (ctx) {
            return {
                hasSupport: true,
                message: ''
            }
        } else {
            return {
                hasSupport: false,
                message: MESSAGES.BAD_GPU
            }
        }
    } catch (e) {
        return {
            hasSupport: false,
            message: MESSAGES.BAD_GPU
        }
    }
}

class Game {
    error: boolean
    errorMessage: string

    lastTime: number
    accumTime: number
    readonly timeStep: number

    mode: number

    mouse: Mouse
    keyboard: Keyboard

    paths: any[]

    loader: Loader
    resources: Resources
    entities: Entities
    soundSystem: SoundSystem
    sounds: any[]
    events: EventEmitter
    player: ReplayPlayer

    width: number
    height: number
    mapName: string
    camera: THREE.PerspectiveCamera
    renderer: THREE.WebGLRenderer
    worldScene: WorldScene
    skyScene: SkyScene

    static readonly MODE_FREE = 0
    static readonly MODE_REPLAY = 1

    constructor(paths: any) {
        let status = checkWebGLSupport()
        if (!status.hasSupport) {
            this.error = true
            this.errorMessage = 'No WebGL support!'

            return
        } else {
            this.error = false
            this.errorMessage = ''
        }

        this.lastTime = 0
        this.accumTime = 0
        this.timeStep = 1 / 60

        this.mouse = new Mouse()
        this.keyboard = new Keyboard()

        this.resources = new Resources(this)
        this.entities = new Entities()
        this.soundSystem = new SoundSystem()
        this.sounds = []

        this.paths = paths
        this.loader = new Loader(this)
        this.loader.events.addListener('loadall', (loader: any) => {
            if (loader && loader.replay) {
                this.changeReplay(loader.replay.data)
            }

            let map = loader.map.data
            let skies = loader.skies
            let skiesValid = true
            skies.forEach((sky: any) => {
                skiesValid = skiesValid && sky.isDone()
            })
            if (skiesValid) {
                map.skies = skies.map((sky: any) => sky.data)
            }

            if (loader.sounds.length > 0) {
                loader.sounds.forEach((sound: any) => {
                    if (sound.data) {
                        this.sounds.push(sound.data)
                    }
                })
            }

            this.changeMap(map, map.name)

            this.events.emit('load', loader)
        })

        window.addEventListener('mousedown', this.mousedown.bind(this))
        window.addEventListener('mouseup',   this.mouseup.bind(this))
        window.addEventListener('mousemove', this.mousemove.bind(this))
        window.addEventListener('keydown',   this.keydown.bind(this))
        window.addEventListener('keyup',     this.keyup.bind(this))

        this.camera = new THREE.PerspectiveCamera(70, 1, 1, 100000)
        this.camera.rotation.order = 'ZXY'
        this.camera.rotation.x = 1.57
        this.camera.position.y = 0

        let log = console.log
        console.log = () => null
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: false,
            stencil: false
        })
        console.log = log

        this.renderer.autoClear = false
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setSize(this.width, this.height)

        this.worldScene = new WorldScene(this.renderer)
        this.skyScene = new SkyScene(this.renderer)
        this.skyScene.initialize(this.resources.sky)

        this.mode = Game.MODE_FREE

        this.player = new ReplayPlayer(this)
        this.events = new EventEmitter()

        this.mapName = ''

        this.draw.bind(this)()
    }

    getCanvas() {
        return this.renderer.domElement
    }

    load(name: string) {
        this.events.emit('loadstart')
        this.loader.load(name)
    }

    changeMap(map: any, mapName: string) {
        if (this.mapName.toLowerCase() === mapName.toLowerCase()) {
            return
        }

        this.mapName = mapName

        this.resources.initialize(map)
        this.entities.initialize(map.entities, this.resources)
        this.worldScene.initialize(this.entities)
        this.skyScene.initialize(this.resources.sky)

        let startEntity = Array.find(
                this.entities.list,
                (e: any) => e.meta.classname === 'info_player_start')
        if (startEntity) {
            this.camera.position.x = startEntity.meta.origin[0]
            this.camera.position.y = startEntity.meta.origin[1]
            this.camera.position.z = startEntity.meta.origin[2]
        }

        this.camera.rotation.x = Math.PI / 2
        this.camera.rotation.z = 0

        this.events.emit('mapchange', this, map, mapName)
    }

    changeReplay(replay: any) {
        this.events.emit('prereplaychange', this, replay)

        this.player.changeReplay(replay)

        this.events.emit('postreplaychange', this, replay)
    }

    draw() {
        requestAnimationFrame(this.draw.bind(this))

        let canvas = this.renderer.domElement
        let parent = canvas.parentElement
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

        this.skyScene.draw(this.camera)
        this.worldScene.draw(this.camera)

        this.lastTime = currTime
    }

    update(dt: number) {
        this.events.emit('preupdate', this)

        let camera = this.camera
        let keyboard = this.keyboard
        let mouse = this.mouse

        if (this.mode === Game.MODE_REPLAY) {
            this.player.update(dt)
        } else if (this.mode === Game.MODE_FREE) {
            if (mouse.click) {
                let mX = mouse.delta.y / 100
                let mY = mouse.delta.x / 100

                let x = Math.max(0.05, Math.min(3.09, camera.rotation.x - mX))
                let y = camera.rotation.z - mY

                camera.rotation.x = x
                camera.rotation.z = y
            }

            const speed = 500
            const ds = speed * dt
            const KEY_W = Keyboard.KEYS.W
            const KEY_S = Keyboard.KEYS.S
            const KEY_A = Keyboard.KEYS.A
            const KEY_D = Keyboard.KEYS.D
            const KEY_R = Keyboard.KEYS.R
            const KEY_F = Keyboard.KEYS.F
            if (keyboard.keys[KEY_W] !== keyboard.keys[KEY_S]) {
                if (keyboard.keys[KEY_W]) {
                    camera.position.y += Math.cos(camera.rotation.z) * ds
                    camera.position.x -= Math.sin(camera.rotation.z) * ds
                } else if (keyboard.keys[KEY_S]) {
                    camera.position.y += Math.cos(camera.rotation.z - 3.14) * ds
                    camera.position.x -= Math.sin(camera.rotation.z - 3.14) * ds
                }
            }

            if (keyboard.keys[KEY_A] !== keyboard.keys[KEY_D]) {
                if (keyboard.keys[KEY_A]) {
                    camera.position.y += Math.cos(camera.rotation.z + 1.57) * ds
                    camera.position.x -= Math.sin(camera.rotation.z + 1.57) * ds
                } else if (keyboard.keys[KEY_D]) {
                    camera.position.y += Math.cos(camera.rotation.z - 1.57) * ds
                    camera.position.x -= Math.sin(camera.rotation.z - 1.57) * ds
                }
            }

            if (keyboard.keys[KEY_R] !== keyboard.keys[KEY_F]) {
                if (keyboard.keys[KEY_R]) {
                    camera.position.z += ds
                } else if (keyboard.keys[KEY_F]) {
                    camera.position.z -= ds
                }
            }
        }

        mouse.delta.x = 0
        mouse.delta.y = 0

        this.events.emit('postupdate', this)
    }

    on(eventName: string, callback: any) {
        return this.events.addListener(eventName, callback)
    }

    off(eventName: string, callback: any) {
        this.events.removeListener(eventName, callback)
    }

    mousedown() {
        this.mouse.click = true
    }

    mouseup() {
        this.mouse.click = false
    }

    mousemove(e: MouseEvent) {
        this.mouse.delta.x = e.pageX - this.mouse.position.x
        this.mouse.delta.y = e.pageY - this.mouse.position.y

        this.mouse.position.x = e.pageX
        this.mouse.position.y = e.pageY
    }

    keydown(e: KeyboardEvent) {
        this.keyboard.keys[e.which] = 1
    }

    keyup(e: KeyboardEvent) {
        this.keyboard.keys[e.which] = 0
    }
}

export { Game }
