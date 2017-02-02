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

    change(skies) {
        let materials = skies.map(sky => {
            let texture = new THREE.DataTexture(
                sky.data, sky.width, sky.height, THREE.RGBAFormat)
            texture.name = sky.name
            texture.premultiplyAlpha = true
            texture.magFilter = THREE.LinearFilter
            texture.minFilter = THREE.LinearMipMapLinearFilter
            texture.anisotropy = this.renderer.getMaxAnisotropy()
            texture.generateMipmaps = true
            texture.needsUpdate = true;

            return new THREE.MeshBasicMaterial({
                map: texture,
                side: THREE.BackSide
            })
        })
        
        let up    = materials.find(m => m.map.name.slice(-2) === 'up')
        let down  = materials.find(m => m.map.name.slice(-2) === 'dn')
        let left  = materials.find(m => m.map.name.slice(-2) === 'lf')
        let right = materials.find(m => m.map.name.slice(-2) === 'rt')
        let front = materials.find(m => m.map.name.slice(-2) === 'ft')
        let back  = materials.find(m => m.map.name.slice(-2) === 'bk')

        let geometry = new THREE.BoxGeometry(4096, 4096, 4096)
        geometry.rotateZ(Math.PI / 2)
        let uvs = [
            // back
            [ [0, 1], [1, 1], [0, 0] ],
            [ [1, 1], [1, 0], [0, 0] ],
            // front
            [ [1, 0], [0, 0], [1, 1] ],
            [ [0, 0], [0, 1], [1, 1] ],
            // left
            [ [0, 0], [0, 1], [1, 0] ],
            [ [0, 1], [1, 1], [1, 0] ],
            // right
            [ [1, 1], [1, 0], [0, 1] ],
            [ [1, 0], [0, 0], [0, 1] ],
            // up
            [ [1, 1], [1, 0], [0, 1] ],
            [ [1, 0], [0, 0], [0, 1] ],
            // down
            [ [0, 0], [0, 1], [1, 0] ],
            [ [0, 1], [1, 1], [1, 0] ]
        ]
        geometry.faceVertexUvs[0] = uvs.map(uv => [
            new THREE.Vector2(uv[0][0], uv[0][1]),
            new THREE.Vector2(uv[1][0], uv[1][1]),
            new THREE.Vector2(uv[2][0], uv[2][1])
        ])

        this.scene.children[0] =
            new THREE.Mesh(geometry, new THREE.MultiMaterial([
                back, front, left, right, up, down
            ]))
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