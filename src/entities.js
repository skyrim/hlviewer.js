import * as THREE from 'three'

const isInvisible = (entity) => {
    const INVISIBLE_ENTITIES = [
        'target_cdaudio', 'trigger_auto', 'trigger_autosave',
        'trigger_camera', 'trigger_cdaudio', 'trigger_changelevel',
        'trigger_changetarget', 'trigger_counter', 'trigger_endsection',
        'trigger_gravity', 'trigger_hurt', 'trigger_monsterjump',
        'trigger_multiple', 'trigger_once', 'trigger_push',
        'trigger_relay', 'trigger_teleport', 'trigger_transition',
        'func_bomb_target', 'func_buyzone', 'func_ladder']

    return INVISIBLE_ENTITIES.includes(entity.classname)
}

export default class Entities {
    constructor() {
        this.list = []
    }

    clear() {
        this.list.length = 0
    }

    initialize(entities, resources) {
        this.clear()

        entities.forEach(e => {
            let t = {
                meta: e
            }

            switch (e.classname) {
                case 'worldspawn': {
                    t.model = resources.models[0]

                    t.model.material.materials.forEach((m, idx) => {
                        if (m.map.name.charAt(0) === '{') {
                            let data = Uint8Array.from(m.map.image.data)
                            for (let i = 3; i < data.length; i += 4) {
                                data[i] = 255
                            }

                            let w = m.map.image.width
                            let h = m.map.image.height
                            
                            let newTexture = new THREE.DataTexture(data, w, h)
                            newTexture.name = m.map.name
                            newTexture.premultiplyAlpha = true
                            newTexture.magFilter = THREE.LinearFilter
                            newTexture.minFilter = THREE.LinearMipMapLinearFilter
                            newTexture.anisotropy = m.map.anisotropy
                            newTexture.generateMipmaps = true
                            newTexture.wrapS = THREE.RepeatWrapping;
                            newTexture.wrapT = THREE.RepeatWrapping;
                            newTexture.repeat.y = -1;
                            newTexture.needsUpdate = true;

                            let newMaterial = new THREE.MeshLambertMaterial({
                                map: newTexture,
                                transparent: false,
                                visible: m.visible
                            })

                            t.model.material.materials[idx] = newMaterial
                        }
                    })

                    break
                }

                default: {
                    if (typeof e.model === 'number' && !isInvisible(e)) {
                        t.model = resources.models[e.model].clone()
                        t.model.rotation.order = 'ZXY'
                        if (e.origin) {
                            t.model.position.x = e.origin[0]
                            t.model.position.y = e.origin[1]
                            t.model.position.z = e.origin[2]
                            if (e.angles) {
                                t.model.rotation.x = e.angles[0] * Math.PI / 180
                                t.model.rotation.y = e.angles[2] * Math.PI / 180
                                t.model.rotation.z = e.angles[1] * Math.PI / 180
                            }
                        }

                        if (e.rendermode === 0) {
                            e.renderamt = 255
                        }

                        if (e.rendermode !== 4 && e.renderamt < 255) {
                            t.model.material.materials.forEach(m => {
                                t.model.renderOrder = 1
                                m.depthWrite = false
                                m.alphaTest = 0.05
                                m.opacity = e.renderamt / 255
                            })
                        }

                        if (e.rendermode === 5) {
                            t.model.material.materials.forEach(m => {
                                t.model.renderOrder = 1
                                m.depthWrite = false
                                m.blending = THREE.AdditiveBlending
                            })
                        }
                    }
                    break;
                }
            }

            this.list.push(t)
        })
    }
}