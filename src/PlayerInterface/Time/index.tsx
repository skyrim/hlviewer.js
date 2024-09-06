import { h, Component } from 'preact'
import type { Unsubscribe } from 'nanoevents'
import { formatTime } from '../../Time'
import type { ReplayPlayer } from '../../ReplayPlayer'
import { Time as s } from './style'

interface TimeProps {
  player: ReplayPlayer
}

interface TimeState {
  isPlaying: boolean
}

export class Time extends Component<TimeProps, TimeState> {
  private offPlay?: Unsubscribe
  private offPause?: Unsubscribe
  private offStop?: Unsubscribe

  componentDidMount() {
    this.offPlay = this.props.player.events.on('play', this.onPlay)
    this.offPause = this.props.player.events.on('pause', this.onPauseOrStop)
    this.offStop = this.props.player.events.on('stop', this.onPauseOrStop)
  }

  componentWillUnmount() {
    this.offPlay?.()
    this.offPause?.()
    this.offStop?.()
  }

  onPlay = () => {
    this.setState(
      {
        isPlaying: true
      },
      this.update
    )
  }

  onPauseOrStop = () => {
    this.setState({
      isPlaying: false
    })
  }

  update = () => {
    if (!this.state.isPlaying) {
      return
    }

    this.forceUpdate()
    setTimeout(this.update, 100)
  }

  render() {
    const current = formatTime(this.props.player.currentTime)
    const total = formatTime(this.props.player.replay.length)

    return (
      <div class={s.time}>
        {current} / {total}
      </div>
    )
  }
}
