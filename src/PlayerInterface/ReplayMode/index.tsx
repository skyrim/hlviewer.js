import { Time } from '../Time'
import type { Game } from '../../Game'
import { TimeLine } from '../TimeLine'
import { useGameState } from '../GameState'
import { VolumeControl } from '../VolumeControl'
import { PlayButton } from '../Buttons/PlayButton'
import { PauseButton } from '../Buttons/PauseButton'
import { VolumeButton } from '../Buttons/VolumeButton'
import { SpeedUpButton } from '../Buttons/SpeedUpButton'
import { SpeedDownButton } from '../Buttons/SpeedDownButton'
import { SettingsButton } from '../Buttons/SettingsButton'
import { FullscreenButton } from '../Buttons/FullscreenButton'
import { ControlsStyle as cs } from '../Controls.style'

export function ReplayMode(props: { class: string; game: Game; root: Element; visible: boolean }) {
  const gameState = useGameState()

  const onPlayClick = () => {
    props.game.player.play()
  }

  const onPauseClick = () => {
    props.game.player.pause()
  }

  const onSpeedDown = () => {
    props.game.player.speedDown()
  }

  const onSpeedUp = () => {
    props.game.player.speedUp()
  }

  const onVolumeClick = () => {
    props.game.soundSystem.toggleMute()
  }

  return (
    <div class={props.class}>
      <TimeLine game={props.game} />

      <div class={cs.buttons}>
        <div class={cs.left}>
          <SpeedDownButton onClick={() => onSpeedDown()} />
          {gameState.isPaused || !gameState.isPlaying ? (
            <PlayButton onClick={() => onPlayClick()} />
          ) : (
            <PauseButton onClick={() => onPauseClick()} />
          )}
          <SpeedUpButton onClick={() => onSpeedUp()} />
          <VolumeButton onClick={() => onVolumeClick()} />
          <VolumeControl game={props.game} />
          <Time player={props.game.player} />
        </div>

        <div class={cs.right}>
          <SettingsButton game={props.game} />
          <FullscreenButton active={true} root={props.root} />
        </div>
      </div>
    </div>
  )
}
