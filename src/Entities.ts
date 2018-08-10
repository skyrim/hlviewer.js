import * as THREE from 'three'
import { Resources, Model } from './Resources'
import { Game } from './Game'

const isInvisible = (entity: any) => {
  const INVISIBLE_ENTITIES = [
    'target_cdaudio',
    'trigger_auto',
    'trigger_autosave',
    'trigger_camera',
    'trigger_cdaudio',
    'trigger_changelevel',
    'trigger_changetarget',
    'trigger_counter',
    'trigger_endsection',
    'trigger_gravity',
    'trigger_hurt',
    'trigger_monsterjump',
    'trigger_multiple',
    'trigger_once',
    'trigger_push',
    'trigger_relay',
    'trigger_teleport',
    'trigger_transition',
    'func_bomb_target',
    'func_buyzone',
    'func_ladder'
  ]

  for (let i = 0; i < INVISIBLE_ENTITIES.length; ++i) {
    if (INVISIBLE_ENTITIES[i] === entity.classname) {
      return true
    }
  }

  return false
}

export class Entity {
  meta: any
  model: Model | null

  constructor(meta: any, model?: Model) {
    this.meta = meta
    if (model) {
      this.model = model.clone()
    } else {
      this.model = null
    }
  }

  update(dt: number, game: Game) {
    if (this.model) {
      this.model.update(dt, this, game)
    }
  }
}

export class Entities {
  list: Entity[]

  constructor() {
    this.list = []
  }

  clear() {
    this.list.length = 0
  }

  initialize(entities: any[], resources: Resources) {
    this.clear()

    entities.forEach(e => {
      let model

      switch (e.classname) {
        case 'worldspawn': {
          model = resources.models['*0']
          const mesh = model.mesh
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((m: any, idx: number) => {
              if (m.map.name.charAt(0) === '{') {
                let data = Uint8Array.from(m.map.image.data)
                for (let i = 3; i < data.length; i += 4) {
                  data[i] = 255
                }

                let w = m.map.image.width
                let h = m.map.image.height

                let newTexture = new THREE.DataTexture(
                  data,
                  w,
                  h,
                  THREE.RGBAFormat,
                  THREE.UnsignedByteType,
                  THREE.Texture.DEFAULT_MAPPING,
                  THREE.RepeatWrapping,
                  THREE.RepeatWrapping,
                  THREE.LinearFilter,
                  THREE.LinearMipMapLinearFilter
                )

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

                if (Array.isArray(mesh.material)) {
                  mesh.material[idx] = newMaterial
                }
              }
            })
          }

          break
        }

        default: {
          if (
            e.model &&
            (e.model[0] === '*' || e.model.indexOf('.spr') > -1) &&
            !isInvisible(e)
          ) {
            model = resources.models[e.model]
            const mesh = model.mesh.clone()
            mesh.rotation.order = 'ZXY'
            if (e.origin) {
              mesh.position.x = e.origin[0]
              mesh.position.y = e.origin[1]
              mesh.position.z = e.origin[2]
              if (e.angles) {
                mesh.rotation.x = (e.angles[0] * Math.PI) / 180
                mesh.rotation.y = (e.angles[2] * Math.PI) / 180
                mesh.rotation.z = (e.angles[1] * Math.PI) / 180
              }
            }

            if (e.rendermode === 0) {
              e.renderamt = 255
            }

            if (e.rendermode !== 4 && e.renderamt < 255) {
              if (Array.isArray(mesh.material)) {
                mesh.material.forEach((m: any) => {
                  mesh.renderOrder = 1
                  m.depthWrite = false
                  m.alphaTest = 0.05
                  m.opacity = e.renderamt / 255
                })
              } else {
                mesh.renderOrder = 1
                mesh.material.depthWrite = false
                mesh.material.alphaTest = 0.05
                mesh.material.opacity = e.renderamt / 255
              }
            }

            if (e.rendermode === 5) {
              if (Array.isArray(mesh.material)) {
                mesh.material.forEach((m: any) => {
                  mesh.renderOrder = 1
                  m.depthWrite = false
                  m.blending = THREE.AdditiveBlending
                })
              } else {
                mesh.renderOrder = 1
                mesh.material.depthWrite = false
                mesh.material.blending = THREE.AdditiveBlending
              }
            }
          }
          break
        }
      }

      this.list.push(new Entity(e, model))
    })
  }
}
