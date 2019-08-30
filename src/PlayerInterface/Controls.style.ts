import { stylesheet } from 'typestyle'

const controlsStyle = () => ({
  zIndex: 30,
  position: 'absolute' as 'absolute',
  width: '100%',
  bottom: 0,
  padding: '0 16px',
  boxSizing: 'border-box' as 'border-box',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  userSelect: 'none' as 'none',
  opacity: 0,
  transition: 'opacity 0.2s'
})

export const ControlsStyle = stylesheet({
  controls: {
    ...controlsStyle()
  },
  controlsVisible: {
    ...controlsStyle(),
    opacity: 1
  },
  buttons: {
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '6px',
    alignItems: 'center'
  },
  button: {
    width: '32px',
    height: '32px',
    padding: '7px',
    boxSizing: 'border-box',
    cursor: 'pointer'
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    $nest: {
      '& .button': {
        marginRight: '8px'
      }
    }
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    width: '70px',
    height: '100%',
    justifyContent: 'space-between'
  }
})
