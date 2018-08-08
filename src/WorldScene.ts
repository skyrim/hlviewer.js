import * as THREE from 'three'

class WorldScene {
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

  initialize(entities: any) {
    this.clear()

    entities.list.forEach((e: any) => {
      if (!e.model) {
        return
      }

      this.meshes.add(e.model)
    })
  }

  getMeshes() {
    return this.meshes.children
  }

  draw(camera: THREE.Camera) {
    this.renderer.render(this.scene, camera)
  }
}

export { WorldScene }
