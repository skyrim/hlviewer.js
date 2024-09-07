import { ControlsStyle as cs } from '../../Controls.style'

export function SpeedUpButton(props: { onClick(): void }) {
  return (
    <button type="button" class={cs.button} onClick={() => props.onClick()}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="currentcolor">
        <title>Speed Up</title>
        <path d="M0 0 L0 64 L32 32 L32 64 L64 32 L32 0 L32 32 Z" />
      </svg>
    </button>
  )
}
