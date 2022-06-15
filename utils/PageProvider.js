import { ThemeProvider } from '@mui/material';
import { darkTheme, lightTheme } from './themes';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

import React from 'react';

export default function PageProvider({ children }) {
  const { resolvedTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState(lightTheme);

  useEffect(() => {
    resolvedTheme === 'light'
      ? setCurrentTheme(lightTheme)
      : setCurrentTheme(darkTheme);
  }, [resolvedTheme]);

  return <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>;
}
