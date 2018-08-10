import * as THREE from 'three'
import { Entities } from './Entities';

export class WorldScene {
  renderer: THREE.WebGLRenderer

  scene: THREE.Scene
  light: THREE.AmbientLight
  meshes: THREE.Scene

  constructor(renderer: THREE.WebGLRenderer) {
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

  initialize(entities: Entities) {
    this.clear()

    entities.list.forEach(entity => {
      if (entity.model) {
        this.meshes.add(entity.model.mesh)
      }
    })
  }

  getMeshes() {
    return this.meshes.children
  }

  draw(camera: THREE.Camera) {
    this.renderer.render(this.scene, camera)
  }
}
