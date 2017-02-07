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
        let canvas = document.createElement('canvas')
        canvas.width = 1024
        canvas.height = 1024
        let ctx = canvas.getContext('2d')

        let coords = {
            up: [  0, 256],
            rt: [  0, 512],
            ft: [256, 512],
            lf: [512, 512],
            bk: [768, 512],
            dn: [  0, 768]
        }
        
        skies.forEach(sky => {
            let smc = document.createElement('canvas')
            let smctx = smc.getContext('2d')
            smc.width = sky.width
            smc.height = sky.height
            let imageData = smctx.getImageData(0, 0, smc.width, smc.height)
            for (let i = 0; i < sky.data.length; ++i) {
                imageData.data[i] = sky.data[i]
            }
            smctx.putImageData(imageData, 0, 0)
            smctx.rotate(Math.Pi / 2)
            smctx.drawImage(smc, 0, 0)

            let c = coords[sky.name.slice(-2)]
            ctx.drawImage(smc, c[0], c[1])
        })

        let texture = new THREE.CanvasTexture(
            canvas,
            THREE.UVMapping,
            THREE.ClampToEdgeWrapping,
            THREE.ClampToEdgeWrapping,
            THREE.LinearFilter,
            THREE.LinearFilter,
            THREE.RGBAFormat,
            THREE.UnsignedByteType,
            this.renderer.getMaxAnisotropy()
        )
        texture.generateMipmaps = true
        texture.needsUpdate = true
        let material = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide
        })

        let geometry = new THREE.BoxGeometry(4096, 4096, 4096)
        let uvs =  [
            // back
            [ [0.750, 0.499], [1.000, 0.499], [0.750, 0.251] ],
            [ [1.000, 0.499], [1.000, 0.251], [0.750, 0.251] ],
            // front
            [ [0.500, 0.251], [0.250, 0.251], [0.500, 0.499] ],
            [ [0.250, 0.251], [0.250, 0.499], [0.500, 0.499] ],
            // left
            [ [0.500, 0.251], [0.500, 0.499], [0.750, 0.251] ],
            [ [0.500, 0.499], [0.750, 0.499], [0.750, 0.251] ],
            // right
            [ [0.250, 0.500], [0.250, 0.250], [0.000, 0.500] ],
            [ [0.250, 0.250], [0.000, 0.250], [0.000, 0.500] ],
            // up
            [ [0.249, 0.749], [0.249, 0.500], [0.000, 0.749] ],
            [ [0.249, 0.500], [0.000, 0.500], [0.000, 0.749] ],
            // down
            [ [0.000, 0.000], [0.000, 0.250], [0.249, 0.000] ],
            [ [0.000, 0.250], [0.249, 0.250], [0.249, 0.000] ]
        ]
        geometry.faceVertexUvs[0] = uvs.map(uv => [
            new THREE.Vector2(uv[0][0], uv[0][1]),
            new THREE.Vector2(uv[1][0], uv[1][1]),
            new THREE.Vector2(uv[2][0], uv[2][1])
        ])

        this.scene.children[0] = new THREE.Mesh(geometry, material)
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