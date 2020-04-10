import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#049509',
    },
    secondary: {
      main: '#4caf50',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#e8f5e9',
    },
  },
});