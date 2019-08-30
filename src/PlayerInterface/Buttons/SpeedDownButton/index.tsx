import { h } from 'preact'
import { classes } from 'typestyle'
import { SpeedDownButtonStyle as s } from './style'
import { ControlsStyle as cs } from '../../Controls.style'

export function SpeedDownButton(props: { onClick?: (e: any) => void }) {
  return (
    <div class={classes(cs.button, s.button)} onClick={props.onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        fill="currentcolor"
      >
        <path d="M0 0 L0 64 L32 32 L32 64 L64 32 L32 0 L32 32 Z" />
      </svg>
    </div>
  )
}
