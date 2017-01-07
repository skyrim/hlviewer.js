import * as THREE from 'three'

export default class SkyScene {
    constructor(renderer) {
        this.renderer = renderer
        let scene = new THREE.Scene()
        let geometry = new THREE.BoxGeometry(-1000, 1000, 1000)
        let material = new THREE.MeshBasicMaterial({color:0x88aae2})
        let mesh = new THREE.Mesh(geometry, material)
        scene.add(mesh)
        
        this.scene = scene
    }

    change(/* textures */) {
        // TODO: create sky box using proper textures
        // texture name is written in game.entities[0].skyname,
        // but it can be undefined in which case use whatever
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