import * as THREE from 'three'

export default class SkyScene {
    constructor(renderer) {
        this.renderer = renderer
        this.scene = new THREE.Scene()
    }

    initialize(sky) {
        this.scene.children[0] = sky
    }

    draw(camera) {
        let posx = camera.position.x
        let posy = camera.position.y
        let posz = camera.position.z

        camera.position.x = 0
        camera.position.y = 0
        camera.position.z = 0

        this.renderer.render(this.scene, camera)
        this.renderer.clearDepth()

        camera.position.x = posx
        camera.position.y = posy
        camera.position.z = posz
    }
}