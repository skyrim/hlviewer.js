import type { Game } from '../../Game'
import { SettingsButton } from '../Buttons/SettingsButton'
import { FullscreenButton } from '../Buttons/FullscreenButton'

export function FreeMode(props: { class: string; game: Game; root: Element }) {
  return (
    <div class={props.class}>
      <div class="hlv-buttons">
        <div class="hlv-buttons-left" />
        <div class="hlv-buttons-right">
          <SettingsButton game={props.game} />
          <FullscreenButton active={false} root={props.root} />
        </div>
      </div>
    </div>
  )
}
