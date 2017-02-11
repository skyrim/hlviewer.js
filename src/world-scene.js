import * as THREE from 'three'

export default class WorldScene {
    constructor(renderer) {
        this.renderer = renderer

        this.scene = new THREE.Scene()
        this.light = new THREE.AmbientLight(0xffffff)
        this.meshes = new THREE.Scene()

        this.scene.add(this.light)
        this.scene.add(this.meshes)
    }

    clear() {
        this.scene.children[1].children.length = 0
    }

    initialize(entities) {
        this.clear()

        entities.list.forEach(e => {
            if (!e.model) {
                return
            }

            this.meshes.add(e.model)
        })
    }

    getMeshes() {
        return this.meshes.children
    }

    draw(camera) {
        this.renderer.render(this.scene, camera)
    }
}