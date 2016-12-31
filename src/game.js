import * as THREE from 'three'
import WorldScene from './world-scene'
import SkyScene from './sky-scene'

export default class Game {
    constructor() {
        this.mouse = {
            click: false,
            leftClick: false,
            rightClick: false,
            position: [0, 0],
            delta: [0, 0]
        }

        this.keyboard = {
            key: []
        }
        for (let i = 0; i < 256; ++i) {
            this.keyboard.key.push(false)
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
        
        this.skyScene.draw(this.renderer, this.camera)
        this.worldScene.draw(this.renderer, this.camera)
    }

    update() {
        if (this.mouse.click) {
            let mX = this.mouse.delta[1] / 100
            let mY = this.mouse.delta[0] / 100

            let x = Math.max(0.05, Math.min(3.09, this.camera.rotation.x - mX))
            let y = this.camera.rotation.z - mY

            this.camera.rotation.x = x
            this.camera.rotation.z = y
        }

        if (this.keyboard.key['W'.charCodeAt(0)] !== this.keyboard.key['S'.charCodeAt(0)]) {
            if (this.keyboard.key['W'.charCodeAt(0)]) {
                this.camera.position.y += Math.cos(this.camera.rotation.z) * 10
                this.camera.position.x -= Math.sin(this.camera.rotation.z) * 10
            }
            else if (this.keyboard.key['S'.charCodeAt(0)]) {
                this.camera.position.y += Math.cos(this.camera.rotation.z - 3.14) * 10
                this.camera.position.x -= Math.sin(this.camera.rotation.z - 3.14) * 10
            }
        }

        if (this.keyboard.key['A'.charCodeAt(0)] !== this.keyboard.key['D'.charCodeAt(0)]) {
            if (this.keyboard.key['A'.charCodeAt(0)]) {
                this.camera.position.y += Math.cos(this.camera.rotation.z + 1.57) * 10
                this.camera.position.x -= Math.sin(this.camera.rotation.z + 1.57) * 10
            }
            else if (this.keyboard.key['D'.charCodeAt(0)]) {
                this.camera.position.y += Math.cos(this.camera.rotation.z - 1.57) * 10
                this.camera.position.x -= Math.sin(this.camera.rotation.z - 1.57) * 10
            }
        }

        if (this.keyboard.key['R'.charCodeAt(0)] !== this.keyboard.key['F'.charCodeAt(0)]) {
            if (this.keyboard.key['R'.charCodeAt(0)]) {
                this.camera.position.z += 10
            }
            else if (this.keyboard.key['F'.charCodeAt(0)]) {
                this.camera.position.z -= 10
            }
        }

        this.mouse.delta[0] = 0
        this.mouse.delta[1] = 0
    }

    mousedown(e) {
        e.preventDefault()

        this.mouse.click = true
    }

    mouseup(e) {
        e.preventDefault();

        this.mouse.click = false
    }

    mousemove(e) {
        e.preventDefault();

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