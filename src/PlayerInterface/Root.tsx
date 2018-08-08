import { h, Component } from 'preact'
import { Game, PlayerMode } from '../Game'
import { Loading } from './Loading'
import { FreeMode } from './FreeMode'
import { ReplayMode } from './ReplayMode'
import './style.scss'
import { Fullscreen } from '../Fullscreen'

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
  screenClickTime: number
}

export class Root extends Component<RootProps, RootState> {
  private node: HTMLDivElement
  private fadeOut: any = 0
  private doubleClickTimer: any = 0

  constructor(props: RootProps) {
    super(props)

    this.state = {
      title: props.game.title,
      screenClickTime: 0,
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

    this.node.appendChild(this.props.game.renderer.domElement)

    this.props.game.on('loadstart', this.onLoadStart)
    this.props.game.on('load', this.onLoadEnd)
    this.props.game.on('modechange', this.onModeChange)
    this.props.game.on('titlechange', this.onTitleChange)
    window.addEventListener('click', this.onWindowClick)
    this.props.root.addEventListener('click', this.onRootClick)
    window.addEventListener('keydown', this.onKeyDown)
    this.props.root.addEventListener('mouseover', this.onMouseEnter)
    this.props.root.addEventListener('mousemove', this.onMouseMove)
    this.props.root.addEventListener('mouseout', this.onMouseLeave)
  }

  componentWillUnmount() {
    this.props.game.off('loadstart', this.onLoadStart)
    this.props.game.off('load', this.onLoadEnd)
    this.props.game.off('modechange', this.onModeChange)
    this.props.game.off('titlechange', this.onTitleChange)
    window.removeEventListener('click', this.onWindowClick)
    this.props.root.removeEventListener('click', this.onRootClick)
    window.removeEventListener('keydown', this.onKeyDown)
    this.props.root.removeEventListener('mouseover', this.onMouseEnter)
    this.props.root.removeEventListener('mousemove', this.onMouseMove)
    this.props.root.removeEventListener('mouseout', this.onMouseLeave)
  }

  onWindowClick = () => {
    this.setState({ isActive: false })
  }

  onRootClick = (e: MouseEvent) => {
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
    if (this.state.isMouseOver) {
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
    const currentTime = Date.now()

    if (currentTime - this.state.screenClickTime < 500) {
      clearTimeout(this.doubleClickTimer)
      if (Fullscreen.isInFullscreen()) {
        Fullscreen.exit()
      } else {
        Fullscreen.enter(this.props.root)
      }
    } else {
      this.doubleClickTimer = setTimeout(() => {
        if (this.props.game.mode !== PlayerMode.REPLAY) {
          return
        }

        const player = this.props.game.player
        if (!player.isPlaying || player.isPaused) {
          player.play()
        } else {
          player.pause()
        }
      }, 500)
    }

    this.setState({ screenClickTime: currentTime })
  }

  render() {
    const game = this.props.game

    const hlvVisCls = this.state.isVisible ? ' hlv--visible' : ''
    const titleVisCls = this.state.isVisible ? ' hlv__title--visible' : ''
    const ctrlVisCls = this.state.isVisible ? ' hlv__controls--visible' : ''

    return (
      <div class={`hlv${hlvVisCls}`}>
        <div class={`hlv__title${titleVisCls}`}>{this.state.title}</div>

        <Loading game={game} visible={this.state.isLoading} />

        <div
          class="hlv__screen"
          ref={node => (this.node = node)}
          onClick={this.onScreenClick}
        />

        {game.mode === PlayerMode.FREE ? (
          <FreeMode
            class={`hlv__controls${ctrlVisCls}`}
            game={game}
            root={this.props.root}
            visible={this.state.isMouseOver}
          />
        ) : (
          <ReplayMode
            class={`hlv__controls${ctrlVisCls}`}
            game={game}
            root={this.props.root}
            visible={this.state.isMouseOver}
          />
        )}
      </div>
    )
  }
}
