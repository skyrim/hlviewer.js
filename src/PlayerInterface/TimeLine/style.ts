import { stylesheet } from 'typestyle'

export const TimeLine = stylesheet({
  timeline: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    height: '26px',
    cursor: 'pointer'
  },
  line: {
    height: '4px',
    backgroundColor: '#fff',
    position: 'absolute',
    left: '0',
    right: '0',
    borderRadius: '2px'
  },
  ghostLine: {
    height: '4px',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    position: 'absolute',
    left: '0',
    right: '0',
    borderRadius: '2px'
  },
  knob: {
    position: 'absolute',
    width: '12px',
    height: '12px',
    backgroundColor: '#fff',
    borderRadius: '6px',
    left: '100%',
    marginLeft: '-6px'
  },
  ghostKnob: {
    position: 'absolute',
    width: '8px',
    height: '8px',
    backgroundColor: '#fff',
    boxSizing: 'border-box',
    borderRadius: '8px',
    left: '0',
    marginLeft: '-4px',
    display: 'none',
    $nest: {
      '&:hover': {
        display: 'block'
      }
    }
  }
})
