import '../styles/globals.css';

import Head from 'next/head';
import { CssBaseline } from '@mui/material';
import { CacheProvider, css, EmotionCache } from '@emotion/react';
import createEmotionCache from '../utils/createEmotionCache';
import PageProvider from '../utils/PageProvider';
import Globalstyles from '../utils/Globalstyles';
import { ThemeProvider } from 'next-themes';

//client side cache, shared for the whole user session
const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  // useEffect(() => {
  //   const jssStyles = document.querySelector('#jss-server-side');
  //   if (jssStyles) {
  //     jssStyles.parentElement.removeChild(jssStyles);
  //   }
  // }, []);
  return (
    <ThemeProvider themes={['light', 'dark', 'system']}>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <PageProvider>
          <CssBaseline />
          <Globalstyles />
          <Component {...pageProps} />
        </PageProvider>
      </CacheProvider>
    </ThemeProvider>
    // <Component {...pageProps} />
  );
}

export default MyApp;
