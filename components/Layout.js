import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Link,
  CssBaseline,
  useMediaQuery,
  // Switch,
} from '@mui/material';
import Head from 'next/head';
import React from 'react';
import useStyles from '../utils/styles';
import NextLink from 'next/link';
import { ShoppingCart } from '@mui/icons-material';
import { useTheme } from 'next-themes';

import { ThemeSwitch } from '../utils/ThemeSwitch';

export default function Layout({ title, description, children }) {
  const classes = useStyles();

  const systemMode = useMediaQuery('(prefers-color-scheme: dark');

  const { resolvedTheme, setTheme } = useTheme();

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  console.log(systemMode);

  return (
    <div>
      <Head>
        <title>{title ? `${title} - Next Amazona` : 'Next Amazona'}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>

      {/* <ThemeProvider theme={theme}> */}
      <CssBaseline />
      <AppBar position="static" className={classes.navbar}>
        <Toolbar>
          <NextLink href="/" passHref>
            <Link>
              <Typography className={classes.brand}>amazona</Typography>
            </Link>
          </NextLink>

          <div className={classes.grow}></div>

          <ThemeSwitch
            checked={resolvedTheme === 'light' ? false : true}
            // onChange={() =>
            //   setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
            // }
            onChange={() => {
              if (systemMode) {
                setTheme('dark');
              } else {
                setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
              }
            }}
            inputProps={{ 'aria-label': 'controlled' }}
          />

          {/* <Switch
            checked={resolvedTheme === 'light' ? false : true}
            onChange={() =>
              setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
            }
            icon={<LightModeIcon />}
            checkedIcon={<DarkModeIcon />}
          ></Switch> */}
          {/* <Button
            css={css`
              background: linear-gradient(
                to top right,
                #2a48f3 0%,
                #c32cc2 100%
              );
            `}
            variant="contained"
            onClick={() =>
              setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
            } 
          ></Button> */}
          <NextLink href="/cart" passHref>
            <Link>
              <ShoppingCart />
            </Link>
          </NextLink>
          <NextLink href="/cart" passHref>
            <Link>
              {/* Login <LoginIcon /> */}
              Login
            </Link>
          </NextLink>
        </Toolbar>
      </AppBar>

      {/* main */}

      <Container className={classes.main}>{children}</Container>

      {/* footer */}
      <footer className={classes.footer}>
        <Typography>All rights reserved. Next Amazona</Typography>
      </footer>
      {/* </ThemeProvider> */}
    </div>
  );
}
