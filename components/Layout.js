import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Link,
  useMediaQuery,
  Badge,
  Button,
  Menu,
  MenuItem,
  // Switch,
} from '@mui/material';
import Head from 'next/head';
import React from 'react';
import useStyles from '../utils/styles';
import NextLink from 'next/link';
import { ShoppingCart } from '@mui/icons-material';
import { useTheme } from 'next-themes';
import { ThemeSwitch } from '../utils/ThemeSwitch';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';

export default function Layout({ title, description, children }) {
  const classes = useStyles();
  const router = useRouter();
  const { state, dispatch } = React.useContext(Store);
  const systemMode = useMediaQuery('(prefers-color-scheme: dark');

  const { resolvedTheme, setTheme } = useTheme();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const { cart, userInfo } = state;

  const loginClickHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const loginMenuCloseHandler = () => {
    setAnchorEl(null);
  };

  const logoutClickHandler = () => {
    setAnchorEl(null); //close menu
    dispatch({ type: 'USER_LOGOUT' });
    router.push('/');
  };

  return (
    <div>
      <Head>
        <title>{title ? `${title} - Next Amazona` : 'Next Amazona'}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>

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

          <NextLink href="/cart" passHref>
            <Link>
              {/* <Badge badgeContent={state.cart.cartItems.length || 0}>
                <ShoppingCart />
              </Badge> */}
              {cart.cartItems.length > 0 ? (
                <Badge color="secondary" badgeContent={cart.cartItems.length}>
                  <ShoppingCart />
                </Badge>
              ) : (
                <Badge color="secondary" badgeContent="0">
                  <ShoppingCart />
                </Badge>
              )}
            </Link>
          </NextLink>
          {userInfo ? (
            <>
              <Button
                className={classes.navbarButton}
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={loginClickHandler}
              >
                {userInfo.name}
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={loginMenuCloseHandler}
              >
                <MenuItem onClick={loginMenuCloseHandler}>Profile</MenuItem>
                <MenuItem onClick={loginMenuCloseHandler}>My Account</MenuItem>
                <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <NextLink href="/login" passHref>
              <Link>
                {/* Login <LoginIcon /> */}
                Login
              </Link>
            </NextLink>
          )}
        </Toolbar>
      </AppBar>

      {/* main */}

      <Container className={classes.main}>{children}</Container>

      {/* footer */}
      <footer className={classes.footer}>
        <Typography>All rights reserved. Next Amazona</Typography>
      </footer>
    </div>
  );
}
