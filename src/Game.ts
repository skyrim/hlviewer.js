import { createNanoEvents, Emitter as EventEmitter } from 'nanoevents'
import { Bsp } from './Bsp'
import * as Time from './Time'
import { Sound } from './Sound'
import { Loader } from './Loader'
import { Config } from './Config'
import { Mouse } from './Input/Mouse'
import { Touch } from './Input/Touch'
import { Replay } from './Replay/Replay'
import { Camera } from './Graphics/Camera'
import { Keyboard } from './Input/Keyboard'
import { SoundSystem } from './SoundSystem'
import { Context } from './Graphics/Context'
import { ReplayPlayer } from './ReplayPlayer'
import { Renderer } from './Graphics/Renderer'
import { SkyScene } from './Graphics/SkyScene'
import { WorldScene } from './Graphics/WorldScene'

export enum PlayerMode {
  FREE,
  REPLAY
}

type GameInitSuccess = { status: 'success'; game: Game }
type GameInitError = { status: 'error'; message: string }
type GameInit = GameInitSuccess | GameInitError

export class Game {
  public static init(config: Config): GameInit {
    const status = Context.checkWebGLSupport()
    if (!status.hasSupport) {
      return {
        status: 'error',
        message: 'No WebGL support!'
      }
    }

    const canvas = document.createElement('canvas')
    if (!canvas) {
      return {
        status: 'error',
        message: 'Failed to create <canvas> element!'
      }
    }

    const context = Context.init(canvas)
    if (!context) {
      return {
        status: 'error',
        message: 'Failed to initialize WebGL context'
      }
    }

    const renderer = Renderer.init(context)
    if (!renderer) {
      return {
        status: 'error',
        message: 'Failed to initialize renderer'
      }
    }

    const worldScene = WorldScene.init(context)
    if (!worldScene) {
      return {
        status: 'error',
        message: 'Failed to initialize world scene'
      }
    }

    const skyScene = SkyScene.init(context)
    if (!skyScene) {
      return {
        status: 'error',
        message: 'Failed to initialize sky scene'
      }
    }

    const game = new Game({
      canvas,
      config,
      context,
      renderer,
      worldScene,
      skyScene
    })

    return {
      status: 'success',
      game
    }
  }

  config: Config

  pauseTime: number = 0
  isPaused: boolean = false
  lastTime: number = 0
  accumTime: number = 0
  readonly timeStep: number = 1 / 60

  title: string = ''
  mode: PlayerMode
  pointerLocked: boolean = false

  touch: Touch = new Touch()
  mouse: Mouse = new Mouse()
  keyboard: Keyboard = new Keyboard()

  loader: Loader
  entities: any[] = []
  sounds: Sound[]
  soundSystem: SoundSystem
  events: EventEmitter
  player: ReplayPlayer

  canvas: HTMLCanvasElement
  mapName: string
  context: Context
  camera: Camera
  renderer: Renderer
  worldScene: WorldScene
  skyScene: SkyScene

  constructor(params: {
    config: Config
    canvas: HTMLCanvasElement
    context: Context
    renderer: Renderer
    worldScene: WorldScene
    skyScene: SkyScene
  }) {
    this.sounds = []
    this.soundSystem = new SoundSystem()

    this.config = params.config
    this.loader = new Loader(this.config)
    this.loader.events.on('loadall', this.onLoadAll)

    document.addEventListener('touchstart', this.onTouchStart, false)
    document.addEventListener('touchend', this.onTouchEnd, false)
    document.addEventListener('touchcancel', this.onTouchEnd, false)
    document.addEventListener('touchmove', this.onTouchMove, false)
    document.addEventListener('mousemove', this.onMouseMove, false)
    window.addEventListener('keydown', this.keyDown)
    window.addEventListener('keyup', this.keyUp)
    window.addEventListener('visibilitychange', this.onVisibilityChange)

    this.canvas = params.canvas
    this.camera = Camera.init(this.canvas.width / this.canvas.height)

    this.context = params.context
    this.renderer = params.renderer
    this.worldScene = params.worldScene
    this.skyScene = params.skyScene

    this.mode = PlayerMode.FREE

    this.player = new ReplayPlayer(this)
    this.events = createNanoEvents()

    this.mapName = ''
  }

  getCanvas() {
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

  onLoadAll = (loader: Loader) => {
    if (loader && loader.replay) {
      this.changeReplay(loader.replay.data)
      this.changeMode(PlayerMode.REPLAY)
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
    const touch = this.touch

    if (this.mode === PlayerMode.REPLAY) {
      this.player.update(dt)
    } else if (this.mode === PlayerMode.FREE) {
      if (this.touch.pressed) {
        camera.rotation[0] = Math.min(
          Math.max(camera.rotation[0] + touch.delta[1] / 100, -Math.PI / 2),
          Math.PI / 2
        )
        camera.rotation[1] -= touch.delta[0] / 100
      } else {
        camera.rotation[0] = Math.min(
          Math.max(camera.rotation[0] + mouse.delta[1] / 100, -Math.PI / 2),
          Math.PI / 2
        )
        camera.rotation[1] -= mouse.delta[0] / 100
      }

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

    mouse.delta[0] = 0
    mouse.delta[1] = 0

    this.events.emit('postupdate', this)
  }

  onTouchStart = (e: TouchEvent) => {
    const touch = e.touches.item(0)
    if (touch) {
      this.touch.pressed = true
      this.touch.position[0] = touch.clientX
      this.touch.position[1] = touch.clientY
    }
  }

  onTouchEnd = () => {
    this.touch.pressed = false
    this.touch.delta[0] = 0
    this.touch.delta[1] = 0
  }

  onTouchMove = (e: TouchEvent) => {
    const touch = e.touches.item(0)
    if (touch && this.touch.pressed) {
      this.touch.delta[0]
      this.touch.delta[0] = touch.clientX - this.touch.position[0]
      this.touch.delta[1] = touch.clientY - this.touch.position[1]

      this.touch.position[0] = touch.clientX
      this.touch.position[1] = touch.clientY
    }
  }

  onMouseMove = (e: MouseEvent) => {
    if (this.pointerLocked) {
      this.mouse.delta[0] = e.movementX * 0.5 // mul 0.5 to lower sensitivity
      this.mouse.delta[1] = e.movementY * 0.5 //

      this.mouse.position[0] = e.pageX
      this.mouse.position[1] = e.pageY
    }
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
