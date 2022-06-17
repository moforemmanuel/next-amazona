import {
  Button,
  CircularProgress,
  Link,
  List,
  ListItem,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import Layout from '../components/Layout';
import useStyles from '../utils/styles';
import NextLink from 'next/link';
import axios from 'axios';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';

export default function Login() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const classes = useStyles();
  const { state, dispatch } = React.useContext(Store);
  const { userInfo } = state;
  const router = useRouter();
  const { redirect } = router.query;

  // React.useEffect(() => {
  //   if (userInfo) {
  //     router.push('/');
  //   }
  // }, []);

  // const [email, setEmail] = React.useState('');
  // const [password, setPassword] = React.useState('');

  const submitHandler = async ({ email, password }) => {
    // e.preventDefault();
    closeSnackbar();
    try {
      const { data } = await axios.post(
        '/api/users/login',
        {
          email,
          password,
        }
        // { headers: { 'Content-Type': 'application/json' } }
      );
      dispatch({ type: 'USER_LOGIN', payload: data });
      //set user in cookies, see store for this action.type

      //redirect
      router.push(redirect || '/');
      enqueueSnackbar(`Welcome back ${data.name}`, { variant: 'success' });
    } catch (err) {
      enqueueSnackbar(
        err.response.data ? err.response.data.message : err.message,
        { variant: 'error' }
      );
    }
  };

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (userInfo) {
      router.push('/');
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <CircularProgress />;
  } else {
    return (
      <Layout title="Login">
        <form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
          <Typography component="h1" variant="h1">
            Login
          </Typography>
          <List>
            <ListItem>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="email"
                    label="Email"
                    inputProps={{ type: 'email' }}
                    // onChange={(e) => setEmail(e.target.value)}
                    error={Boolean(errors.email)}
                    helperText={
                      errors.email
                        ? errors.email.type === 'pattern'
                          ? 'Email is not valid'
                          : 'Email is required'
                        : ''
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>
            <ListItem>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 6,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="password"
                    label="Password"
                    inputProps={{ type: 'password' }}
                    // onChange={(e) => setPassword(e.target.value)}
                    error={Boolean(errors.email)}
                    helperText={
                      errors.password
                        ? errors.password.type === 'minLength'
                          ? 'Password should be atleast 6 characters'
                          : 'Password is required'
                        : ''
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>
            <ListItem>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                color="secondary"
              >
                Login
              </Button>
            </ListItem>
            <ListItem>
              Don't have an account? &nbsp;
              <NextLink href={`/register?redirect=${redirect || '/'}`} passHref>
                <Link>Register</Link>
              </NextLink>
            </ListItem>
          </List>
        </form>
      </Layout>
    );
  }
}
