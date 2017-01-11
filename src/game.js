import * as THREE from 'three'
import WorldScene from './world-scene'
import SkyScene from './sky-scene'
import ReplayPlayer from './replay-player'

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

        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
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

        this.draw.bind(this)()
    }

    getCanvas() {
        return this.renderer.domElement
    }

    changeMap(map, replay = null) {
        this.worldScene.change(map)
        this.skyScene.change()

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

        this.player = replay ? ReplayPlayer.createFromReplay(replay) : null
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
        
        this.skyScene.draw(this.camera)
        this.worldScene.draw(this.camera)
    }

    update() {
        let camera = this.camera
        let keyboard = this.keyboard
        let mouse = this.mouse

        if (this.player && this.player.isPlaying) {
            let frame = this.player.getFrame()
            if (frame) {
                this.camera.position.x = frame.position[0]
                this.camera.position.y = frame.position[1]
                this.camera.position.z = frame.position[2]
                this.camera.rotation.x = (90 - frame.rotation[0]) * 0.0174;
                this.camera.rotation.z = (0.0174 * frame.rotation[1]) - 1.57;
            }
        } else {
            if (mouse.click) {
                let mX = mouse.delta[1] / 100
                let mY = mouse.delta[0] / 100

                let x = Math.max(0.05, Math.min(3.09, camera.rotation.x - mX))
                let y = camera.rotation.z - mY

                camera.rotation.x = x
                camera.rotation.z = y
            }

            if (keyboard.key['W'.charCodeAt(0)] !== keyboard.key['S'.charCodeAt(0)]) {
                if (keyboard.key['W'.charCodeAt(0)]) {
                    camera.position.y += Math.cos(camera.rotation.z) * 10
                    camera.position.x -= Math.sin(camera.rotation.z) * 10
                } else if (keyboard.key['S'.charCodeAt(0)]) {
                    camera.position.y += Math.cos(camera.rotation.z - 3.14) * 10
                    camera.position.x -= Math.sin(camera.rotation.z - 3.14) * 10
                }
            }

            if (keyboard.key['A'.charCodeAt(0)] !== keyboard.key['D'.charCodeAt(0)]) {
                if (keyboard.key['A'.charCodeAt(0)]) {
                    camera.position.y += Math.cos(camera.rotation.z + 1.57) * 10
                    camera.position.x -= Math.sin(camera.rotation.z + 1.57) * 10
                } else if (keyboard.key['D'.charCodeAt(0)]) {
                    camera.position.y += Math.cos(camera.rotation.z - 1.57) * 10
                    camera.position.x -= Math.sin(camera.rotation.z - 1.57) * 10
                }
            }

            if (keyboard.key['R'.charCodeAt(0)] !== keyboard.key['F'.charCodeAt(0)]) {
                if (keyboard.key['R'.charCodeAt(0)]) {
                    camera.position.z += 10
                } else if (keyboard.key['F'.charCodeAt(0)]) {
                    camera.position.z -= 10
                }
            }
        }

        mouse.delta[0] = 0
        mouse.delta[1] = 0
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