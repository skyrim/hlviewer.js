import { createSignal } from 'solid-js'
import { classes } from 'typestyle'
import { type Game, PlayerMode } from '../../../Game'
import { ControlsStyle as cs } from '../../Controls.style'
import { SettingsButtonStyle as s } from './style'

export function SettingsButton(props: { game: Game }) {
  const [isOpen, setIsOpen] = createSignal(false)
  const hasReplay = !!props.game.player.replay

  const onFreeModeClick = () => {
    if (props.game.mode === PlayerMode.FREE) {
      return
    }

    props.game.changeMode(PlayerMode.FREE)
    props.game.player.pause()
  }

  const onReplayModeClick = () => {
    if (props.game.mode === PlayerMode.REPLAY) {
      return
    }

    props.game.changeMode(PlayerMode.REPLAY)
  }

  return (
    <div class={s.settings}>
      <button type="button" class={classes(cs.button, s.button)} onClick={() => setIsOpen(!isOpen())}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <title>Toggle</title>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            fill="#ffffff"
            d="M23.9 10.7c0-0.3-0.4-0.6-0.8-0.6 -1.1 0-2.1-0.6-2.5-1.6 -0.4-1-0.1-2.2 0.7-3 0.3-0.2 0.3-0.6 0.1-0.9 -0.6-0.7-1.2-1.4-1.9-1.9 -0.3-0.2-0.7-0.2-0.9 0.1 -0.7 0.8-2 1.1-3 0.7 -1-0.4-1.7-1.5-1.6-2.6 0-0.4-0.2-0.7-0.6-0.7 -0.9-0.1-1.8-0.1-2.7 0C10.4 0.1 10.1 0.4 10.1 0.8 10.1 1.9 9.5 2.9 8.5 3.3 7.5 3.7 6.2 3.4 5.5 2.6c-0.2-0.3-0.6-0.3-0.9-0.1 -0.7 0.6-1.4 1.2-1.9 1.9C2.4 4.8 2.5 5.2 2.7 5.4c0.8 0.8 1.1 2 0.7 3 -0.4 1-1.4 1.6-2.6 1.6 -0.4 0-0.7 0.2-0.7 0.6 -0.1 0.9-0.1 1.8 0 2.7 0 0.3 0.4 0.6 0.8 0.6 1 0 2 0.6 2.5 1.6 0.4 1 0.2 2.2-0.7 3 -0.3 0.2-0.3 0.6-0.1 0.9 0.6 0.7 1.2 1.4 1.9 1.9 0.3 0.2 0.7 0.2 0.9-0.1 0.7-0.8 2-1.1 3-0.7 1 0.4 1.7 1.5 1.6 2.6 0 0.4 0.2 0.7 0.6 0.7C11.1 24 11.5 24 12 24c0.4 0 0.9 0 1.3-0.1 0.3 0 0.6-0.3 0.6-0.7 0-1.1 0.6-2.1 1.6-2.6 1-0.4 2.3-0.1 3 0.7 0.2 0.3 0.6 0.3 0.9 0.1 0.7-0.6 1.4-1.2 1.9-1.9 0.2-0.3 0.2-0.7-0.1-0.9 -0.8-0.8-1.1-2-0.7-3 0.4-1 1.4-1.6 2.5-1.6l0.1 0c0.3 0 0.7-0.2 0.7-0.6C24 12.5 24 11.6 23.9 10.7zM12 18c-3.3 0-6-2.7-6-6s2.7-6 6-6c3.3 0 6 2.7 6 6S15.3 18 12 18zM12 16"
          />
        </svg>
      </button>

      <div class={isOpen() ? s.menuOpen : s.menu}>
        <span class={s.menuItemTitle}>Mode</span>
        {hasReplay ? (
          <button
            type="button"
            class={props.game.mode === PlayerMode.REPLAY ? s.menuItemSelected : s.menuItem}
            onClick={() => onReplayModeClick()}
          >
            Replay
          </button>
        ) : (
          <span />
        )}
        <button
          type="button"
          class={props.game.mode === PlayerMode.FREE ? s.menuItemSelected : s.menuItem}
          onClick={() => onFreeModeClick()}
        >
          Free
        </button>
      </div>
    </div>
  )
}
