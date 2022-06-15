import { GlobalStyles, css } from '@mui/material';
import React from 'react';

export default function Globalstyles() {
  return (
    <GlobalStyles
      styles={css`
        :root{
          body {
            background-color: #fff;
            color: #121212;
          }
        }
        
        [data-theme="dark"] {
          body {
            background-color: #121212;
            color: #fff;
          }
        }
        }`}
    />
  );
}
