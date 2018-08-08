import { h, Component } from 'preact'

interface PlayButtonProps {
  onClick?: (e: any) => void
}

export class PlayButton extends Component<PlayButtonProps> {
  render() {
    return (
      <div class="hlv__button button__play" onClick={this.props.onClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          fill="currentcolor"
        >
          <path d="M0 0 L0 64 L64 32 Z" />
        </svg>
      </div>
    )
  }
}
