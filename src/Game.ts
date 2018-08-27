import { EventEmitter } from 'events'
import * as Time from './Time'
import { Keyboard } from './Keyboard'
import { Loader } from './Loader'
import { Mouse } from './Mouse'
import { Sound } from './Sound'
import { SoundSystem } from './SoundSystem'
import { Replay } from './Replay'
import { ReplayPlayer } from './ReplayPlayer'
import { Camera } from './Graphics/Camera'
import { Context } from './Graphics/Context'
import { Renderer } from './Graphics/Renderer'
import { WorldScene } from './Graphics/WorldScene'
import { Bsp } from './Bsp'
import { clamp } from 'lodash-es'
import { SkyScene } from './Graphics/SkyScene'

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

  pauseTime: number = 0
  isPaused: boolean = false
  lastTime: number = 0
  accumTime: number = 0
  readonly timeStep: number = 1 / 60

  title: string
  mode: PlayerMode
  pointerLocked: boolean = false

  mouse: Mouse
  keyboard: Keyboard

  loader: Loader
  entities: any[] = []
  soundSystem: SoundSystem
  sounds: Sound[]
  events: EventEmitter
  player: ReplayPlayer

  canvas: HTMLCanvasElement
  width: number
  height: number
  mapName: string
  context: Context
  camera: Camera
  renderer: Renderer
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

    this.mouse = new Mouse()
    this.keyboard = new Keyboard()
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

      this.changeMap(map)

      this.events.emit('load', loader)
    })

    document.addEventListener('mousemove', this.mouseMove, false)
    window.addEventListener('keydown', this.keyDown)
    window.addEventListener('keyup', this.keyUp)
    window.addEventListener('visibilitychange', this.onVisibilityChange)

    const canvas = this.getCanvas()

    this.camera = Camera.init(canvas.width / canvas.height)

    const context = Context.init(canvas)
    if (!context) {
      throw new Error(`contextn\'t`)
    }
    this.context = context

    const renderer = Renderer.init(context)
    if (!renderer) {
      throw new Error("renderern't")
    }
    this.renderer = renderer

    const worldScene = WorldScene.init(context)
    if (!worldScene) {
      throw new Error("worldScenen't")
    }
    this.worldScene = worldScene

    const skyScene = SkyScene.init(context)
    if (!skyScene) {
      throw new Error("skyScenen't")
    }
    this.skyScene = skyScene

    this.mode = PlayerMode.FREE

    this.player = new ReplayPlayer(this)
    this.events = new EventEmitter()

    this.mapName = ''
  }

  getCanvas() {
    if (!this.canvas) {
      this.canvas = document.createElement('canvas')
    }

    return this.canvas
  }

  load(name: string) {
    this.events.emit('loadstart')
    this.loader.load(name)
  }

  changeMap(map: Bsp) {
    if (this.mapName.toLowerCase() === map.name.toLowerCase()) {
      return
    }

    this.mapName = map.name

    this.worldScene.changeMap(map)
    this.skyScene.changeMap(map)

    this.entities = map.entities

    const spawn = map.entities.find(e => e['classname'] === 'info_player_start')

    if (spawn) {
      this.camera.position[0] = spawn.origin[0]
      this.camera.position[1] = spawn.origin[1]
      this.camera.position[2] = spawn.origin[2]
    } else {
      this.camera.position[0] = 0
      this.camera.position[1] = 0
      this.camera.position[2] = 0
    }

    this.camera.rotation[0] = 0 // Math.PI / 2
    this.camera.rotation[1] = 0
    this.camera.rotation[2] = 0
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

    const canvas = this.canvas
    const parent = canvas.parentElement
    if (parent) {
      const pw = parent.clientWidth
      const ph = parent.clientHeight
      if (canvas.width !== pw || canvas.height !== ph) {
        canvas.width = pw
        canvas.height = ph
        this.camera.aspect = canvas.clientWidth / canvas.clientHeight
        this.camera.updateProjectionMatrix()
        this.context.gl.viewport(
          0,
          0,
          this.context.gl.drawingBufferWidth,
          this.context.gl.drawingBufferHeight
        )
      }

      if (
        canvas.clientWidth !== canvas.width ||
        canvas.clientHeight !== canvas.height
      ) {
        canvas.width = canvas.clientWidth
        canvas.height = canvas.clientHeight
        this.camera.aspect = canvas.clientWidth / canvas.clientHeight
        this.camera.updateProjectionMatrix()
        this.context.gl.viewport(
          0,
          0,
          this.context.gl.drawingBufferWidth,
          this.context.gl.drawingBufferHeight
        )
      }
    }

    const currTime = Time.now() / 1000
    const dt = currTime - this.lastTime
    this.accumTime += dt

    while (this.accumTime > this.timeStep) {
      this.update(this.timeStep)
      this.accumTime -= this.timeStep
    }

    this.renderer.draw()
    if (this.mapName !== '') {
      this.skyScene.draw(this.camera)
      this.worldScene.draw(this.camera, this.entities)
    }

    this.lastTime = currTime
  }

  update(dt: number) {
    this.events.emit('preupdate', this)

    const camera = this.camera
    const keyboard = this.keyboard
    const mouse = this.mouse

    if (this.mode === PlayerMode.REPLAY) {
      this.player.update(dt)
    } else if (this.mode === PlayerMode.FREE && this.pointerLocked) {
      camera.rotation[0] = clamp(
        camera.rotation[0] + mouse.delta.y / 100,
        -Math.PI / 2,
        Math.PI / 2
      )
      camera.rotation[1] -= mouse.delta.x / 100

      const speed = 500
      const ds = speed * dt
      const KEY_W = Keyboard.KEYS.W
      const KEY_S = Keyboard.KEYS.S
      const KEY_A = Keyboard.KEYS.A
      const KEY_D = Keyboard.KEYS.D
      const downKey = Keyboard.KEYS.C
      const upKey = Keyboard.KEYS.SPACE
      if (keyboard.keys[KEY_W] !== keyboard.keys[KEY_S]) {
        if (keyboard.keys[KEY_W]) {
          camera.position[1] -= Math.cos(camera.rotation[1] + Math.PI / 2) * ds
          camera.position[0] += Math.sin(camera.rotation[1] + Math.PI / 2) * ds
        } else if (keyboard.keys[KEY_S]) {
          camera.position[1] -= Math.cos(camera.rotation[1] - Math.PI / 2) * ds
          camera.position[0] += Math.sin(camera.rotation[1] - Math.PI / 2) * ds
        }
      }

      if (keyboard.keys[KEY_A] !== keyboard.keys[KEY_D]) {
        if (keyboard.keys[KEY_A]) {
          camera.position[1] += Math.cos(camera.rotation[1]) * ds
          camera.position[0] -= Math.sin(camera.rotation[1]) * ds
        } else if (keyboard.keys[KEY_D]) {
          camera.position[1] -= Math.cos(camera.rotation[1]) * ds
          camera.position[0] += Math.sin(camera.rotation[1]) * ds
        }
      }

      if (keyboard.keys[upKey] !== keyboard.keys[downKey]) {
        if (keyboard.keys[upKey]) {
          camera.position[2] += ds
        } else if (keyboard.keys[downKey]) {
          camera.position[2] -= ds
        }
      }
    }

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

  onVisibilityChange = () => {
    if (document.hidden) {
      if (this.isPaused) {
        return
      }

      this.pauseTime = Time.now() / 1000
      this.isPaused = true
    } else {
      if (!this.isPaused) {
        return
      }

      this.lastTime = Time.now() / 1000 - this.pauseTime + this.lastTime
      this.isPaused = false
    }
  }
}
