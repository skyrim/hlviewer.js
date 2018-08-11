import { EventEmitter } from 'events'
import * as THREE from 'three'
import { Entities } from './Entities'
import { Keyboard } from './Keyboard'
import { Loader } from './Loader'
import { Mouse } from './Mouse'
import { ReplayPlayer } from './ReplayPlayer'
import { Resources } from './Resources'
import { SkyScene } from './SkyScene'
import { SoundSystem } from './SoundSystem'
import * as Time from './Time'
import { WorldScene } from './WorldScene'
import { Sound } from './Sound'
import { Map } from './Map'
import { Replay } from './Replay'

export interface Config {
  paths: {
    base: string
    replays: string
    maps: string
    wads: string
    skies: string
    sounds: string
  }
}

const checkWebGLSupport = () => {
  const MESSAGES = {
    BAD_BROWSER: 'Your browser does not seem to support WebGL',
    BAD_GPU: 'Your graphics card does not seem to support WebGL'
  }

  const wnd: any = window
  if (!wnd.WebGLRenderingContext) {
    return {
      hasSupport: false,
      message: MESSAGES.BAD_BROWSER
    }
  }

  const c = document.createElement('canvas')
  try {
    const ctx = c.getContext('webgl') || c.getContext('experimental-webgl')
    if (ctx) {
      return {
        hasSupport: true,
        message: ''
      }
    } else {
      return {
        hasSupport: false,
        message: MESSAGES.BAD_GPU
      }
    }
  } catch (e) {
    return {
      hasSupport: false,
      message: MESSAGES.BAD_GPU
    }
  }
}

export enum PlayerMode {
  FREE,
  REPLAY
}

export class Game {
  error: boolean
  errorMessage: string
  config: Config

  lastTime: number
  accumTime: number
  readonly timeStep: number

  title: string
  mode: PlayerMode
  pointerLocked: boolean = false

  mouse: Mouse
  keyboard: Keyboard

  loader: Loader
  resources: Resources
  entities: Entities
  soundSystem: SoundSystem
  sounds: Sound[]
  events: EventEmitter
  player: ReplayPlayer

  width: number
  height: number
  mapName: string
  camera: THREE.PerspectiveCamera
  renderer: THREE.WebGLRenderer
  worldScene: WorldScene
  skyScene: SkyScene

  constructor(config: Config) {
    const status = checkWebGLSupport()
    if (!status.hasSupport) {
      this.error = true
      this.errorMessage = 'No WebGL support!'

      return
    } else {
      this.error = false
      this.errorMessage = ''
    }

    this.lastTime = 0
    this.accumTime = 0
    this.timeStep = 1 / 60

    this.mouse = new Mouse()
    this.keyboard = new Keyboard()

    this.resources = new Resources(this)
    this.entities = new Entities()
    this.soundSystem = new SoundSystem()
    this.sounds = []

    this.config = config
    this.loader = new Loader(this)
    this.loader.events.addListener('loadall', (loader: Loader) => {
      if (loader && loader.replay) {
        this.changeReplay(loader.replay.data)
      }

      if (!loader.map || !loader.map.data) {
        return
      }

      const map = loader.map.data
      const skies = loader.skies
      let skiesValid = true
      skies.forEach(sky => {
        skiesValid = skiesValid && sky.isDone()
      })
      if (skiesValid) {
        skies.forEach(sky => (sky.data ? map.skies.push(sky.data) : 0))
      }

      // add sprites
      Object.entries(loader.sprites).forEach(([name, item]) => {
        if (item.data) {
          map.sprites[name] = item.data
        }
      })

      if (loader.sounds.length > 0) {
        loader.sounds.forEach(sound => {
          if (sound.data) {
            this.sounds.push(sound.data)
          }
        })
      }

      this.changeMap(map, map.name)

      this.events.emit('load', loader)
    })

    document.addEventListener('mousemove', this.mouseMove, false)
    window.addEventListener('keydown', this.keyDown)
    window.addEventListener('keyup', this.keyUp)

    this.camera = new THREE.PerspectiveCamera(70, 1, 1, 100000)
    this.camera.rotation.order = 'ZXY'
    this.camera.rotation.x = 1.57
    this.camera.position.y = 0

    const log = console.log
    console.log = () => null
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      stencil: false
    })
    console.log = log

    this.renderer.autoClear = false
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(this.width, this.height)

    this.worldScene = new WorldScene(this.renderer)
    this.skyScene = new SkyScene(this.renderer)
    this.skyScene.initialize(this.resources.sky)

    this.mode = PlayerMode.FREE

    this.player = new ReplayPlayer(this)
    this.events = new EventEmitter()

    this.mapName = ''

    this.draw.bind(this)()
  }

  getCanvas() {
    return this.renderer.domElement
  }

  load(name: string) {
    this.events.emit('loadstart')
    this.loader.load(name)
  }

  changeMap(map: Map, mapName: string) {
    if (this.mapName.toLowerCase() === mapName.toLowerCase()) {
      return
    }

    this.mapName = mapName

    this.resources.initialize(map)
    this.entities.initialize(map.entities, this.resources)
    this.worldScene.initialize(this.entities)
    this.skyScene.initialize(this.resources.sky)

    const spawnEntity = this.entities.list.find(
      e => e.meta.classname === 'info_player_start'
    )

    if (spawnEntity) {
      this.camera.position.x = spawnEntity.meta.origin[0]
      this.camera.position.y = spawnEntity.meta.origin[1]
      this.camera.position.z = spawnEntity.meta.origin[2]
    }

    this.camera.rotation.x = Math.PI / 2
    this.camera.rotation.z = 0

    this.events.emit('mapchange', this, map, mapName)
  }

  changeReplay(replay: Replay) {
    this.events.emit('prereplaychange', this, replay)

    this.player.changeReplay(replay)

    this.events.emit('postreplaychange', this, replay)
  }

  changeMode(mode: PlayerMode) {
    this.mode = mode
    this.events.emit('modechange', mode)
  }

  setTitle(title: string) {
    this.title = title
    this.events.emit('titlechange', title)
  }

  getTitle() {
    return this.title
  }

  draw = () => {
    requestAnimationFrame(this.draw)

    const canvas = this.renderer.domElement
    const parent = canvas.parentElement
    if (parent) {
      const pw = parent.clientWidth
      const ph = parent.clientHeight
      if (canvas.width !== pw || canvas.height !== ph) {
        this.camera.aspect = pw / ph
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(pw, ph)
      }
    }

    const currTime = Time.now() / 1000
    const dt = currTime - this.lastTime
    this.accumTime += dt

    while (this.accumTime > this.timeStep) {
      this.update(this.timeStep)
      this.accumTime -= this.timeStep
    }

    this.skyScene.draw(this.camera)
    this.worldScene.draw(this.camera)

    this.lastTime = currTime
  }

  update(dt: number) {
    this.events.emit('preupdate', this)

    const camera = this.camera
    const keyboard = this.keyboard
    const mouse = this.mouse

    if (this.mode === PlayerMode.REPLAY) {
      this.player.update(dt)
    } else if (this.mode === PlayerMode.FREE) {
      if (this.pointerLocked) {
        const mX = mouse.delta.y / 100
        const mY = mouse.delta.x / 100

        const x = Math.max(0.05, Math.min(3.09, camera.rotation.x - mX))
        const y = camera.rotation.z - mY

        camera.rotation.x = x
        camera.rotation.z = y
      }

      const speed = 500
      const ds = speed * dt
      const KEY_W = Keyboard.KEYS.W
      const KEY_S = Keyboard.KEYS.S
      const KEY_A = Keyboard.KEYS.A
      const KEY_D = Keyboard.KEYS.D
      const downKey = Keyboard.KEYS.CTRL
      const upKey = Keyboard.KEYS.SPACE
      if (keyboard.keys[KEY_W] !== keyboard.keys[KEY_S]) {
        if (keyboard.keys[KEY_W]) {
          camera.position.y += Math.cos(camera.rotation.z) * ds
          camera.position.x -= Math.sin(camera.rotation.z) * ds
        } else if (keyboard.keys[KEY_S]) {
          camera.position.y += Math.cos(camera.rotation.z - 3.14) * ds
          camera.position.x -= Math.sin(camera.rotation.z - 3.14) * ds
        }
      }

      if (keyboard.keys[KEY_A] !== keyboard.keys[KEY_D]) {
        if (keyboard.keys[KEY_A]) {
          camera.position.y += Math.cos(camera.rotation.z + 1.57) * ds
          camera.position.x -= Math.sin(camera.rotation.z + 1.57) * ds
        } else if (keyboard.keys[KEY_D]) {
          camera.position.y += Math.cos(camera.rotation.z - 1.57) * ds
          camera.position.x -= Math.sin(camera.rotation.z - 1.57) * ds
        }
      }

      if (keyboard.keys[upKey] !== keyboard.keys[downKey]) {
        if (keyboard.keys[upKey]) {
          camera.position.z += ds
        } else if (keyboard.keys[downKey]) {
          camera.position.z -= ds
        }
      }
    }

    this.entities.list.forEach(entity => entity.update(dt, this))

    mouse.delta.x = 0
    mouse.delta.y = 0

    this.events.emit('postupdate', this)
  }

  on(eventName: string, callback: (...args: any[]) => void) {
    return this.events.addListener(eventName, callback)
  }

  off(eventName: string, callback: (...args: any[]) => void) {
    this.events.removeListener(eventName, callback)
  }

  mouseMove = (e: MouseEvent) => {
    this.mouse.delta.x = e.movementX * 0.5 // mul 0.5 to lower sensitivity
    this.mouse.delta.y = e.movementY * 0.5 // 

    this.mouse.position.x = e.pageX
    this.mouse.position.y = e.pageY
  }

  keyDown = (e: KeyboardEvent) => {
    this.keyboard.keys[e.which] = 1

    if (this.pointerLocked) {
      e.preventDefault()
      return false
    }

    return true
  }

  keyUp = (e: KeyboardEvent) => {
    this.keyboard.keys[e.which] = 0

    if (this.pointerLocked) {
      e.preventDefault()
      return false
    }

    return true
  }
}
