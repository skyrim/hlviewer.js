import * as THREE from 'three'

class SkyScene {
  renderer: THREE.WebGLRenderer
  scene: THREE.Scene

  constructor(renderer: THREE.WebGLRenderer) {
    this.renderer = renderer
    this.scene = new THREE.Scene()
  }

  initialize(sky: any) {
    this.scene.children[0] = sky
  }

  draw(camera: THREE.Camera) {
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

export { SkyScene }
