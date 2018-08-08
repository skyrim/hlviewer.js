import { h, Component } from 'preact'

interface PauseButtonProps {
  onClick?: (e: any) => void
}

export class PauseButton extends Component<PauseButtonProps> {
  render() {
    return (
      <div class="hlv__button button__pause" onClick={this.props.onClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          fill="currentcolor"
        >
          <path d="M0 0 L0 64 L20 64 L20 0 M44 0 L64 0 L64 64 L44 64 Z" />
        </svg>
      </div>
    )
  }
}
