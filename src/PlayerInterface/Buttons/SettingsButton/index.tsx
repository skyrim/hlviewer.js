import { createSignal } from 'solid-js'
import { type Game, PlayerMode } from '../../../Game'
import './style.css'

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
    <div classList={{ 'hlv-settings': true, open: isOpen() }}>
      <button type="button" class="hlv-button" onClick={() => setIsOpen(!isOpen())}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <title>Toggle</title>
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
          <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
        </svg>
      </button>

      <div class="hlv-settings-menu">
        <span class="hlv-settings-menu-title">Mode</span>
        {hasReplay ? (
          <button
            type="button"
            classList={{
              'hlv-settings-menu-item': true,
              selected: props.game.mode === PlayerMode.REPLAY
            }}
            onClick={() => onReplayModeClick()}
          >
            Replay
          </button>
        ) : (
          <span />
        )}
        <button
          type="button"
          classList={{
            'hlv-settings-menu-item': true,
            selected: props.game.mode === PlayerMode.FREE
          }}
          onClick={() => onFreeModeClick()}
        >
          Free Move
        </button>
      </div>
    </div>
  )
}
