import { h, Component } from 'preact'
import { Unsubscribe } from 'nanoevents'
import { Time } from '../Time'
import { Game } from '../../Game'
import { TimeLine } from '../TimeLine'
import { VolumeControl } from '../VolumeControl'
import { PlayButton } from '../Buttons/PlayButton'
import { PauseButton } from '../Buttons/PauseButton'
import { RecordButton } from '../Buttons/RecordButton'
import { VolumeButton } from '../Buttons/VolumeButton'
import { SpeedUpButton } from '../Buttons/SpeedUpButton'
import { SettingsButton } from '../Buttons/SettingsButton'
import { SpeedDownButton } from '../Buttons/SpeedDownButton'
import { FullscreenButton } from '../Buttons/FullscreenButton'
import { ControlsStyle as cs } from '../Controls.style'

interface ReplayModeProps {
  class: string
  game: Game
  root: Element
  visible: boolean
}

export class ReplayMode extends Component<ReplayModeProps> {
  private offPlay?: Unsubscribe
  private offPause?: Unsubscribe
  private offStop?: Unsubscribe

  componentDidMount() {
    this.offPlay = this.props.game.player.events.on('play', this.onPlayStateChange)
    this.offPause = this.props.game.player.events.on('pause', this.onPlayStateChange)
    this.offStop = this.props.game.player.events.on('stop', this.onPlayStateChange)
  }

  componentWillUnmount() {
    this.offPlay && this.offPlay()
    this.offPause && this.offPause()
    this.offStop && this.offStop()
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

  onRecord = () => {
    const canvas = this.props.game.canvas
    const stream = (canvas as any).captureStream(60) // record at 60fps
    this.props.game.soundSystem.stream.stream.getAudioTracks().forEach((a) => stream.addTrack(a))

    const chunks: Blob[] = []
    const recorder = new MediaRecorder(stream, {
      audioBitsPerSecond: 128000,
      videoBitsPerSecond: 30720000,
      mimeType: 'video/webm'
    })
    recorder.addEventListener('dataavailable', (e) => {
      chunks.push(e.data)
    })
    recorder.addEventListener('stop', () => {
      exportVid(new Blob(chunks, { type: 'video/webm' }))
    })

    recorder.start()
    setTimeout(() => {
      recorder.stop()
    }, 3000)

    function exportVid(blob: any) {
      const vid = document.createElement('video')
      vid.src = URL.createObjectURL(blob)
      vid.controls = true
      document.body.appendChild(vid)
      const a = document.createElement('a')
      a.download = 'output.webm'
      a.href = vid.src
      a.textContent = 'Download the clip'
      document.body.appendChild(a)
    }
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
            <RecordButton onClick={this.onRecord} />
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
