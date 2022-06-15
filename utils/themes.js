import { createTheme } from '@mui/material';

const baseTheme = createTheme({
  typography: {
    h1: {
      fontSize: '1.6rem',
      fontWeight: 400,
      margin: '1rem 0',
    },
    h2: {
      fontSize: '1.4rem',
      fontWeight: 400,
      margin: '1rem 0',
    },
  },
});

export const lightTheme = createTheme(baseTheme, 
  {
    palette: {
      mode: 'light',
      primary: {
        main: '#f0c000',
      },
      secondary: {
        main: '#208080',
      },
    },
  },
  // baseTheme
);

export const darkTheme = createTheme(baseTheme, 
  {
    palette: {
      mode: 'dark',
      primary: {
        main: '#f0c000',
      },
      secondary: {
        main: '#208080',
      },
    },
  },
  // baseTheme
);
