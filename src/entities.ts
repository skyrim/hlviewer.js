import * as THREE from 'three'

const isInvisible = (entity: any) => {
    const INVISIBLE_ENTITIES = [
        'target_cdaudio', 'trigger_auto', 'trigger_autosave',
        'trigger_camera', 'trigger_cdaudio', 'trigger_changelevel',
        'trigger_changetarget', 'trigger_counter', 'trigger_endsection',
        'trigger_gravity', 'trigger_hurt', 'trigger_monsterjump',
        'trigger_multiple', 'trigger_once', 'trigger_push',
        'trigger_relay', 'trigger_teleport', 'trigger_transition',
        'func_bomb_target', 'func_buyzone', 'func_ladder']

    for (let i = 0; i < INVISIBLE_ENTITIES.length; ++i) {
        if (INVISIBLE_ENTITIES[i] === entity.classname) {
            return true
        }
    }

    return false
}

class Entities {
    list: any[]

    constructor() {
        this.list = []
    }

    clear() {
        this.list.length = 0
    }

    initialize(entities: any[], resources: any) {
        this.clear()

        entities.forEach(e => {
            let t = {
                meta: e,
                model: null
            }

            switch (e.classname) {
                case 'worldspawn': {
                    let model = resources.models[0]
                    let materials = model.material.materials
                    materials.forEach((m: any, idx: number) => {
                        if (m.map.name.charAt(0) === '{') {
                            let data = Uint8Array.from(m.map.image.data)
                            for (let i = 3; i < data.length; i += 4) {
                                data[i] = 255
                            }

                            let w = m.map.image.width
                            let h = m.map.image.height

                            let newTexture = new THREE.DataTexture(
                                data, w, h,
                                THREE.RGBAFormat,
                                THREE.UnsignedByteType,
                                THREE.Texture.DEFAULT_MAPPING,
                                THREE.RepeatWrapping,
                                THREE.RepeatWrapping,
                                THREE.LinearFilter,
                                THREE.LinearMipMapLinearFilter)

                            newTexture.name = m.map.name
                            newTexture.premultiplyAlpha = true
                            newTexture.anisotropy = m.map.anisotropy
                            newTexture.generateMipmaps = true
                            newTexture.repeat.y = -1
                            newTexture.needsUpdate = true

                            let newMaterial = new THREE.MeshLambertMaterial({
                                map: newTexture,
                                transparent: false,
                                visible: m.visible
                            })

                            model.material.materials[idx] = newMaterial
                        }
                    })
                    t.model = model

                    break
                }

                default: {
                    if (typeof e.model === 'number' && !isInvisible(e)) {
                        let model = resources.models[e.model].clone()
                        model.rotation.order = 'ZXY'
                        if (e.origin) {
                            model.position.x = e.origin[0]
                            model.position.y = e.origin[1]
                            model.position.z = e.origin[2]
                            if (e.angles) {
                                model.rotation.x = e.angles[0] * Math.PI / 180
                                model.rotation.y = e.angles[2] * Math.PI / 180
                                model.rotation.z = e.angles[1] * Math.PI / 180
                            }
                        }

                        if (e.rendermode === 0) {
                            e.renderamt = 255
                        }

                        if (e.rendermode !== 4 && e.renderamt < 255) {
                            let materials = model.material.materials
                            materials.forEach((m: any) => {
                                model.renderOrder = 1
                                m.depthWrite = false
                                m.alphaTest = 0.05
                                m.opacity = e.renderamt / 255
                            })
                        }

                        if (e.rendermode === 5) {
                            let materials = model.material.materials
                            materials.forEach((m: any) => {
                                model.renderOrder = 1
                                m.depthWrite = false
                                m.blending = THREE.AdditiveBlending
                            })
                        }

                        t.model = model
                    }
                    break
                }
            }

            this.list.push(t)
        })
    }
}

export { Entities }
