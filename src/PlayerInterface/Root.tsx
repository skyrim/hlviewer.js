import { h, Component } from 'preact'
import { Unsubscribe } from 'nanoevents'
import { Loading } from './Loading'
import { FreeMode } from './FreeMode'
import { ReplayMode } from './ReplayMode'
import { Fullscreen } from '../Fullscreen'
import { Game, PlayerMode } from '../Game'
import { RootStyle as s } from './Root.style'

interface RootProps {
  game: Game
  root: Element
}

interface RootState {
  title: string
  isActive: boolean
  isLoading: boolean
  isMouseOver: boolean
  isVisible: boolean
}

export class Root extends Component<RootProps, RootState> {
  private node: HTMLDivElement | null = null
  private fadeOut: any = 0
  private offLoadStart?: Unsubscribe
  private offLoad?: Unsubscribe
  private offModeChange?: Unsubscribe
  private offTitleChange?: Unsubscribe

  constructor(props: RootProps) {
    super(props)

    this.state = {
      title: props.game.title,
      isActive: false,
      isLoading: false,
      isMouseOver: false,
      isVisible: false
    }
  }

  componentDidMount() {
    if (!this.node) {
      return
    }

    const game = this.props.game
    const root = this.props.root

    this.node.appendChild(game.getCanvas())

    this.offLoadStart = game.events.on('loadstart', this.onLoadStart)
    this.offLoad = game.events.on('load', this.onLoadEnd)
    this.offModeChange = game.events.on('modechange', this.onModeChange)
    this.offTitleChange = game.events.on('titlechange', this.onTitleChange)

    root.addEventListener('click', this.onRootClick)
    window.addEventListener('click', this.onWindowClick)
    window.addEventListener('keydown', this.onKeyDown)
    document.addEventListener(
      'pointerlockchange',
      this.onPointerLockChange,
      false
    )

    root.addEventListener('mouseover', this.onMouseEnter)
    root.addEventListener('mousemove', this.onMouseMove)
    root.addEventListener('mouseout', this.onMouseLeave)
    root.addEventListener('contextmenu', this.onContextMenu)
  }

  componentWillUnmount() {
    const root = this.props.root

    this.offLoadStart && this.offLoadStart()
    this.offLoad && this.offLoad()
    this.offModeChange && this.onModeChange()
    this.offTitleChange && this.offTitleChange()

    root.removeEventListener('click', this.onRootClick)
    window.removeEventListener('click', this.onWindowClick)
    window.removeEventListener('keydown', this.onKeyDown)
    document.removeEventListener(
      'pointerlockchange',
      this.onPointerLockChange,
      false
    )

    root.removeEventListener('mouseover', this.onMouseEnter)
    root.removeEventListener('mousemove', this.onMouseMove)
    root.removeEventListener('mouseout', this.onMouseLeave)
    root.removeEventListener('contextmenu', this.onContextMenu)
  }

  onPointerLockChange = () => {
    if (document.pointerLockElement === this.props.root) {
      this.props.game.pointerLocked = true
    } else {
      this.props.game.pointerLocked = false
    }
  }

  onContextMenu = (e: Event) => {
    e.preventDefault()
  }

  onWindowClick = () => {
    this.setState({ isActive: false })
  }

  onRootClick = (e: Event) => {
    e.stopPropagation()
    this.setState({ isActive: true })
    this.fadeReset()
  }

  onKeyDown = (e: KeyboardEvent) => {
    if (!this.state.isActive) {
      return
    }

    const game = this.props.game

    switch (e.which) {
      case 70: {
        // F
        if (Fullscreen.isInFullscreen()) {
          Fullscreen.exit()
        } else {
          Fullscreen.enter(this.props.root)
        }
        this.fadeReset()
        break
      }

      case 77: {
        // M
        game.soundSystem.toggleMute()
        this.fadeReset()
        break
      }

      case 38: {
        // arrow up
        game.soundSystem.setVolume(game.soundSystem.getVolume() + 0.05)
        this.fadeReset()
        break
      }
      case 40: {
        // arrow down
        game.soundSystem.setVolume(game.soundSystem.getVolume() - 0.05)
        this.fadeReset()
        break
      }

      case 74: // J
      case 37: {
        // arrow left
        game.player.seek(game.player.currentTime - 5)
        this.fadeReset()
        break
      }
      case 76: // L
      case 39: {
        // arrow right
        game.player.seek(game.player.currentTime + 5)
        this.fadeReset()
        break
      }

      case 75: // K
      case 32: {
        // space
        if (this.props.game.mode !== PlayerMode.REPLAY) {
          return
        }

        if (!game.player.isPlaying || game.player.isPaused) {
          game.player.play()
        } else {
          game.player.pause()
        }
        break
      }
    }
  }

  onModeChange = () => {
    this.forceUpdate()
  }

  onLoadStart = () => {
    this.setState({ isLoading: true })
  }

  onLoadEnd = () => {
    this.setState({ isLoading: false })
  }

  onTitleChange = (title: string) => {
    this.setState({ title })
  }

  onMouseEnter = () => {
    this.setState({ isMouseOver: true })
    this.fadeReset()
  }

  onMouseMove = () => {
    if (this.state.isMouseOver && !Fullscreen.isInFullscreen()) {
      this.fadeReset()
    }
  }

  onMouseLeave = () => {
    this.setState({
      isMouseOver: false,
      isVisible: false
    })

    clearTimeout(this.fadeOut)
    this.fadeOut = 0
  }

  fadeReset = () => {
    if (!this.state.isVisible) {
      this.setState({ isVisible: true })
    }

    clearTimeout(this.fadeOut)
    this.fadeOut = setTimeout(() => {
      this.setState({ isVisible: false })
      this.fadeOut = 0
    }, 5000)
  }

  onScreenClick = () => {
    switch (this.props.game.mode) {
      case PlayerMode.REPLAY: {
        const player = this.props.game.player
        if (!player.isPlaying || player.isPaused) {
          player.play()
        } else {
          player.pause()
        }
        break
      }

      case PlayerMode.FREE: {
        this.props.root.requestPointerLock()

        break
      }
    }
  }

  onScreenDblClick = () => {
    if (Fullscreen.isInFullscreen()) {
      Fullscreen.exit()
    } else {
      Fullscreen.enter(this.props.root)
    }
  }

  render() {
    const game = this.props.game
    const isVisible = this.state.isVisible

    return (
      <div class={isVisible ? s.rootVisible : s.root}>
        <div class={isVisible ? s.titleVisible : s.title}>
          {this.state.title}
        </div>

        <Loading game={game} visible={this.state.isLoading} />

        <div
          class={s.screen}
          ref={node => (this.node = node)}
          onClick={this.onScreenClick}
          onDblClick={this.onScreenDblClick}
        />

        {game.mode === PlayerMode.FREE ? (
          <FreeMode
            class={isVisible ? s.controlsVisible : s.controls}
            game={game}
            root={this.props.root}
          />
        ) : (
          <ReplayMode
            class={isVisible ? s.controlsVisible : s.controls}
            game={game}
            root={this.props.root}
            visible={this.state.isMouseOver}
          />
        )}
      </div>
    )
  }
}
