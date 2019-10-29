import { stylesheet, keyframes } from 'typestyle'

export const LoadingStyle = stylesheet({
  loading: {
    position: 'relative' as 'relative',
    width: '100%',
    height: '100%',
    transition: 'opacity 2s ease, z-index 1s linear'
  },
  spinner: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginLeft: '-40px',
    marginTop: '-40px',
    animation: 'rotate 1s linear 0s infinite',
    height: '80px',
    width: '80px',
    animationName: keyframes({
      from: { transform: 'rotate(0deg)' },
      to: { transform: 'rotate(360deg)' }
    })
  },
  log: {
    position: 'absolute',
    background: 'rgba(0,0,0,0.4)',
    padding: '10px',
    fontFamily: 'monospace',
    margin: '0',
    top: '16px',
    right: 0,
    paddingLeft: '16px',
    listStyle: 'none'
  },
  logItem: {
    display: 'block'
  }
})
