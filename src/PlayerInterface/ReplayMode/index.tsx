import { h, Component } from 'preact'
import { Time } from '../Time'
import { Game } from '../../Game'
import { TimeLine } from '../TimeLine'
import { VolumeControl } from '../VolumeControl'
import { PlayButton } from '../Buttons/PlayButton'
import { PauseButton } from '../Buttons/PauseButton'
import { VolumeButton } from '../Buttons/VolumeButton'
import { SpeedUpButton } from '../Buttons/SpeedUpButton'
import { SpeedDownButton } from '../Buttons/SpeedDownButton'
import { SettingsButton } from '../Buttons/SettingsButton'
import { FullscreenButton } from '../Buttons/FullscreenButton'
import { ControlsStyle as cs } from '../Controls.style'

interface ReplayModeProps {
  class: string
  game: Game
  root: Element
  visible: boolean
}

export class ReplayMode extends Component<ReplayModeProps> {
  componentDidMount() {
    this.props.game.player.on('play', this.onPlayStateChange)
    this.props.game.player.on('pause', this.onPlayStateChange)
    this.props.game.player.on('stop', this.onPlayStateChange)
  }

  componentWillUnmount() {
    this.props.game.player.off('play', this.onPlayStateChange)
    this.props.game.player.off('pause', this.onPlayStateChange)
    this.props.game.player.off('stop', this.onPlayStateChange)
  }

  onPlayClick = () => {
    this.props.game.player.play()
  }

  onPauseClick = () => {
    this.props.game.player.pause()
  }

  onSpeedDown = () => {
    this.props.game.player.speedDown()
  }

  onSpeedUp = () => {
    this.props.game.player.speedUp()
  }

  onVolumeClick = () => {
    this.props.game.soundSystem.toggleMute()
  }

  onPlayStateChange = () => {
    this.forceUpdate()
  }

  render() {
    const game = this.props.game
    const player = game.player
    const playing = player.isPlaying
    const paused = player.isPaused

    return (
      <div class={this.props.class}>
        <TimeLine game={game} />

        <div class={cs.buttons}>
          <div class={cs.left}>
            <SpeedDownButton onClick={this.onSpeedDown} />
            {paused || !playing ? (
              <PlayButton onClick={this.onPlayClick} />
            ) : (
              <PauseButton onClick={this.onPauseClick} />
            )}
            <SpeedUpButton onClick={this.onSpeedUp} />
            <VolumeButton onClick={this.onVolumeClick} />
            <VolumeControl game={game} />
            <Time player={player} />
          </div>

          <div class={cs.right}>
            <SettingsButton game={game} />
            <FullscreenButton active={true} root={this.props.root} />
          </div>
        </div>
      </div>
    )
  }
}
