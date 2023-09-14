import '@mui/lab/themeAugmentation'
import { createTheme as createMuiTheme } from '@mui/material/styles'
import typography from './typography'
import breakpoints from './breakpoints'
import components from './components'
import shadows from './shadows'
import { green, grey } from '@material-ui/core/colors'


const customBlue = {
  50: '#e9f0fb',
  100: '#c8daf4',
  200: '#a3c1ed',
  300: '#7ea8e5',
  400: '#6395e0',
  500: '#E54E3D',
  600: '#407ad6',
  700: '#376fd0',
  800: '#2f65cb',
  900: '#2052c2 ',
}

const createTheme = () => {
  return createMuiTheme(
    {
      spacing: 4,
      breakpoints,
      // @ts-expect-error
      components,
      typography,
      shadows,
      palette: {
        mode: 'light',
        primary: {
          main: '#E54E3D',
          contrastText: '#FFF',
        },
        secondary: {
          main: '#E54E3D',
          contrastText: '#FFF',
        },
        background: {
          default: '#F7F9FC',
          paper: '#FFF',
        },
      }
    },
    {
      name: 'dark',
      header: {
        color: grey[300],
        background: '#1B2635',
        search: {
          color: grey[200],
        },
      },
      footer: {
        color: grey[300],
        background: '#444243',
      },
      sidebar: {
        color: grey[200],
        background: '#444243',
        header: {
          color: grey[200],
          background: '#444243',
          brand: {
            color: customBlue[500],
          },
        },
        footer: {
          color: grey[200],
          background: '#444243',
          online: {
            background: green[500],
          },
        },
        badge: {
          color: '#FFF',
          background: customBlue[500],
        },
      },
      size: {
        sidebar: '0',
      },
    }
  )
}

export default createTheme
