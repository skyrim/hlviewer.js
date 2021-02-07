import { h, Component } from 'preact'
import { Unsubscribe } from 'nanoevents'
import { Game } from '../../Game'
import { TimeLine as s } from './style'

interface TimeLineProps {
  game: Game
}

interface TimeLineState {
  progress: number
  ghostKnobActive: boolean
  ghostKnobPos: string
  onPostUpdate: (() => void) | null
}

export class TimeLine extends Component<TimeLineProps, TimeLineState> {
  private offPostUpdate?: Unsubscribe

  constructor(props: TimeLineProps) {
    super(props)

    this.state = {
      progress: 0,
      ghostKnobActive: false,
      ghostKnobPos: '0%',
      onPostUpdate: null
    }
  }

  componentDidMount() {
    this.offPostUpdate = this.props.game.events.on('postupdate', this.onPostUpdate)
  }

  componentWillUnmount() {
    if (this.offPostUpdate) {
      this.offPostUpdate()
    }
  }

  onPostUpdate = () => {
    const player = this.props.game.player
    this.setState({
      progress: player.currentTime / player.replay.length
    })
  }

  onClick = (e: any) => {
    const rects = e.currentTarget.getClientRects()[0]
    const progress = 1 - (rects.right - e.pageX) / (rects.right - rects.left)
    this.props.game.player.seekByPercent(progress * 100)
    this.props.game.player.pause()
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
    const progressPos = 1 - (rects.right - e.pageX) / (rects.right - rects.left)
    const pos = progressPos * 100 + '%'
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
    const timePos = this.state.progress * 100
    const knobOff = timePos + '%'
    const lineOff = 100 - timePos + '%'

    return (
      <div
        class={s.timeline}
        onClick={this.onClick}
        onMouseEnter={this.onMouseEnter}
        onMouseMove={this.onMouseMove}
        onMouseLeave={this.onMouseLeave}
      >
        <div class={s.ghostLine} />
        <div class={s.line} style={{ right: lineOff }} />
        <div class={s.knob} style={{ left: knobOff }} />
        <div class={s.ghostKnob} style={{ left: this.state.ghostKnobPos }} />
      </div>
    )
  }
}
