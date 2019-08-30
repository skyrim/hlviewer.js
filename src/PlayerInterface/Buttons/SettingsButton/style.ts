import { stylesheet } from 'typestyle'

const menuStyle = () => ({
  display: 'none',
  position: 'absolute' as 'absolute',
  left: '-38px',
  bottom: '48px',
  padding: '2px 6px',
  fontSize: '14px',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  flexFlow: 'column',
  minWidth: '100px'
})

const menuItemStyle = () => ({
  cursor: 'pointer',
  margin: '4px 0',
  padding: '4px',
  $nest: {
    '&:last-child': {
      marginTop: 0
    },
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)'
    }
  }
})

export const SettingsButtonStyle = stylesheet({
  settings: {
    position: 'relative'
  },
  menu: {
    ...menuStyle()
  },
  menuOpen: {
    ...menuStyle(),
    display: 'flex'
  },
  menuItemTitle: {
    padding: '6px 4px',
    borderBottom: '1px solid white',
    fontWeight: 'bold'
  },
  menuItem: {
    ...menuItemStyle()
  },
  menuItemSelected: {
    ...menuItemStyle(),
    backgroundColor: 'rgba(255, 255, 255, 0.2) !important'
  },
  button: {
    width: '32px',
    height: '32px',
    padding: '5px'
  }
})
