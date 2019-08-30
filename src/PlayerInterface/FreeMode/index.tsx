import { h } from 'preact'
import { classes } from 'typestyle'
import { Game } from '../../Game'
import { FreeModeStyle as s } from './style'
import { ControlsStyle as cs } from '../Controls.style'
import { SettingsButton } from '../Buttons/SettingsButton'
import { FullscreenButton } from '../Buttons/FullscreenButton'

export function FreeMode(props: { class: string; game: Game; root: Element }) {
  return (
    <div class={classes(props.class, s.controls)}>
      <div class={cs.buttons}>
        <div class={cs.left} />
        <div class={cs.right}>
          <SettingsButton game={props.game} />
          <FullscreenButton active={false} root={props.root} />
        </div>
      </div>
    </div>
  )
}
