import * as THREE from 'three'

function resizeTexture(pixels, width, height, newWidth, newHeight) {
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

function isPowerOfTwo(n) {
    return ((n & (n - 1)) === 0)
}

function nextPowerOfTwo(n) {
    --n;
    for (let i = 1; i < 32; i <<= 1) {
        n = n | n >> i;
    }
    return n + 1;
}

const INVISIBLE_TEXTURES = ['aaatrigger', 'clip', 'null', 'hint', 'nodraw', 'invisible', 'skip', 'trigger', 'sky', 'fog']

function createMaterials(map) {
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
            texture.magFilter = THREE.LinearFilter;
            texture.minFilter = THREE.LinearFilter;
            //texture.anisotropy = game.renderer.getMaxAnisotropy()
        }
        else {
            let pixels = [255, 255, 255, 255, /**/ 255, 128,   0, 255,
                            255, 128,   0, 255, /**/ 255, 255, 255, 255]
            texture = new THREE.DataTexture(new Uint8Array(pixels), 2, 2, THREE.RGBAFormat)
            texture.magFilter = THREE.NearestFilter;
            texture.minFilter = THREE.NearestFilter;
        }
        texture.name = map.textures[i].name
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.y = -1;
        texture.needsUpdate = true;

        materials.push(new THREE.MeshLambertMaterial({map: texture, transparent: true, alphaTest: 0.95}))
    }
    return materials
}

function createMeshes(map, materials) {
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
            if (INVISIBLE_TEXTURES.indexOf(materials[materialIndex].map.name.toLowerCase()) > -1) {
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
    return meshes
}

export default class WorldScene {
    constructor() {
        this.scene = new THREE.Scene()
        this.scene.add(new THREE.AmbientLight(0xdddddd))
    }

    changeMap(map) {
        this.scene.children
        .filter(child => child instanceof THREE.Mesh)
        .forEach(mesh => {
            mesh.geometry.dispose()
            mesh.material.materials.forEach(material => {
                material.map.dispose()
                material.dispose()
            })

            this.scene.remove(mesh)
        })

        let materials = createMaterials(map)
        let meshes = createMeshes(map, materials)
        meshes.forEach(m => this.scene.add(m))
    }

    draw(renderer, camera) {
        renderer.render(this.scene, camera)
    }
}