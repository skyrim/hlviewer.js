import { h, Component } from 'preact'
import { classes } from 'typestyle'
import { Fullscreen } from '../../../Fullscreen'
import { FullscreenButtonStyle as s } from './style'
import { ControlsStyle as cs } from '../../Controls.style'

interface FullscreenButtonProps {
  active: boolean
  root: Element
}

interface FullscreenButtonState {
  isInFullscreen: boolean
}

export class FullscreenButton extends Component<
  FullscreenButtonProps,
  FullscreenButtonState
> {
  state: FullscreenButtonState = {
    isInFullscreen: false
  }

  componentDidMount() {
    Fullscreen.onChange(this.onFullscreen)
  }

  componentWillUnmount() {
    Fullscreen.onChangeRemove(this.onFullscreen)
  }

  onClick = () => {
    if (Fullscreen.isInFullscreen()) {
      Fullscreen.exit()
    } else {
      Fullscreen.enter(this.props.root)
    }
  }

  onFullscreen = () => {
    this.setState({
      isInFullscreen: Fullscreen.isInFullscreen()
    })
  }

  render() {
    return (
      <div class={classes(cs.button, s.button)} onClick={this.onClick}>
        {this.state.isInFullscreen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            fill="currentcolor"
          >
            <path d="M0 22 L22 22 L22 0 L14 0 L14 14 L0 14 M42 0 L42 22 L64 22 L64 14 L50 14 L50 0 M14 50 L0 50 L0 42 L22 42 L22 64 L14 64 M42 64 L42 42 L64 42 L64 50 L50 50 L50 64 Z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            fill="currentcolor"
          >
            <path d="M0 22 L8 22 L8 8 L22 8 L22 0 L0 0 M42 0 L42 8 L56 8 L56 22 L64 22 L64 0 M0 64 L0 42 L8 42 L8 56 L22 56 L22 64 M64 64 L42 64 L42 56 L56 56 L56 42 L64 42 Z" />
          </svg>
        )}
      </div>
    )
  }
}
