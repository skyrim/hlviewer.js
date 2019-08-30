import { h, Component } from 'preact'
import { formatTime } from '../../Time'
import { ReplayPlayer } from '../../ReplayPlayer'
import { Time as s } from './style'

interface TimeProps {
  player: ReplayPlayer
}

interface TimeState {
  isPlaying: boolean
}

export class Time extends Component<TimeProps, TimeState> {
  componentDidMount() {
    this.props.player.events.on('play', this.onPlay)
    this.props.player.events.on('pause', this.onPauseOrStop)
    this.props.player.events.on('stop', this.onPauseOrStop)
  }

  componentWillUnmount() {
    this.props.player.events.removeListener('play', this.onPlay)
    this.props.player.events.removeListener('pause', this.onPauseOrStop)
    this.props.player.events.removeListener('stop', this.onPauseOrStop)
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
