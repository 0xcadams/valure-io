import * as React from 'react';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/styles';

export const fontFamily = [
  'futura-pt',
  '"Helvetica Neue"',
  'Arial',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"'
].join(',');

const ThemeProvider: React.FC<{}> = ({ children }) => {
  const theme = createMuiTheme({
    typography: {
      fontFamily
    },
    palette: {
      primary: {
        main: '#3A3A3A'
      },
      secondary: {
        main: '#48a347'
      },
      type: 'light'
    }
  });

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

export default ThemeProvider;
