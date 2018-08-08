import { h, Component } from 'preact'
import { SettingsButton } from '../Buttons/SettingsButton'
import { FullscreenButton } from '../Buttons/FullscreenButton'
import { Game } from '../../Game'
import './style.scss'

interface FreeModeProps {
  class: string
  game: Game
  root: Element
  visible: boolean
}

export class FreeMode extends Component<FreeModeProps> {
  render() {
    return (
      <div class={`freemode__controls ${this.props.class}`}>
        <div class="controls__buttons">
          <div class="controls__left" />
          <div class="controls__right">
            <SettingsButton class="freemode__settings" game={this.props.game} />
            <FullscreenButton active={false} root={this.props.root} />
          </div>
        </div>
      </div>
    )
  }
}
