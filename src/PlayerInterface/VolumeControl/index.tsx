import { h, Component } from 'preact'
import { Game } from '../../Game'
import './style.scss'

interface VolumeControlProps {
  game: Game
}

interface VolumeControlState {
  volume: number
  ghostKnobActive: boolean
  ghostKnobPos: string
}

export class VolumeControl extends Component<
  VolumeControlProps,
  VolumeControlState
> {
  constructor(props: VolumeControlProps) {
    super(props)

    this.state = {
      volume: props.game.soundSystem.getVolume(),
      ghostKnobActive: false,
      ghostKnobPos: '5%'
    }
  }

  componentDidMount() {
    this.props.game.soundSystem.events.on('volumeChange', this.onVolumeChange)
  }

  componentWillUnmount() {
    this.props.game.soundSystem.events.removeListener(
      'volumeChange',
      this.onVolumeChange
    )
  }

  onVolumeChange = () => {
    this.setState({
      volume: this.props.game.soundSystem.getVolume()
    })
  }

  onClick = (e: any) => {
    const rects = e.currentTarget.getClientRects()[0]
    const volume = 1 - (rects.right - e.pageX) / (rects.right - rects.left)
    this.props.game.soundSystem.setVolume(volume)
  }

  onMouseEnter = () => {
    this.setState({
      ghostKnobActive: true
    })
  }

  onMouseMove = (e: any) => {
    if (!this.state.ghostKnobActive) {
      return
    }

    const rects = e.currentTarget.getClientRects()[0]
    const volumePos = 1 - (rects.right - e.pageX) / (rects.right - rects.left)
    const pos = Math.min(95, Math.max(5, volumePos * 100)) + '%'
    this.setState({
      ghostKnobPos: pos
    })
  }

  onMouseLeave = () => {
    this.setState({
      ghostKnobActive: false
    })
  }

  render() {
    const volumePos = this.state.volume * 100
    const knobOff = Math.min(95, Math.max(5, volumePos)) + '%'
    const lineOff = Math.min(95, Math.max(5, 100 - volumePos)) + '%'

    return (
      <div
        class="volumecontrol"
        onClick={this.onClick}
        onMouseEnter={this.onMouseEnter}
        onMouseMove={this.onMouseMove}
        onMouseLeave={this.onMouseLeave}
      >
        <div class="volumecontrol__ghostline" />
        <div class="volumecontrol__line" style={{ right: lineOff }} />
        <div class="volumecontrol__knob" style={{ left: knobOff }} />
        <div
          class="volumecontrol__ghostknob"
          style={{ left: this.state.ghostKnobPos }}
        />
      </div>
    )
  }
}
