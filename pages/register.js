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

export default function Register() {
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

  // const [name, setName] = React.useState('');
  // const [email, setEmail] = React.useState('');
  // const [password, setPassword] = React.useState('');
  // const [confirmPassword, setConfirmPassword] = React.useState('');

  const submitHandler = async ({ name, email, password, confirmPassword }) => {
    // e.preventDefault();
    closeSnackbar();
    if (password !== confirmPassword) {
      enqueueSnackbar("Passwords don't match", { variant: 'error' });
      return;
    }
    try {
      const { data } = await axios.post(
        '/api/users/register',
        {
          name,
          email,
          password,
        }
        // { headers: { 'Content-Type': 'application/json' } }
      );
      dispatch({ type: 'USER_LOGIN', payload: data });
      //set user in cookies, see store for this action.type

      //redirect
      router.push(redirect || '/');
      enqueueSnackbar(`Welcome ${data.name}`, { variant: 'success' });
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
      <Layout title="Register">
        <form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
          <Typography component="h1" variant="h1">
            Register
          </Typography>
          <List>
            <ListItem>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 2,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="name"
                    label="Name"
                    inputProps={{ type: 'name' }}
                    // onChange={(e) => setEmail(e.target.value)}
                    error={Boolean(errors.name)}
                    helperText={
                      errors.name
                        ? errors.email.type === 'minLength'
                          ? 'Name must be atleast 2 characters'
                          : 'Name is required'
                        : ''
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>

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
              <Controller
                name="confirmPassword"
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
                    id="confirmPassword"
                    label="Confirm Password"
                    inputProps={{ type: 'password' }}
                    // onChange={(e) => setPassword(e.target.value)}
                    error={Boolean(errors.confirmPassword)}
                    helperText={
                      errors.confirmPassword
                        ? errors.confirmPassword.type === 'minLength'
                          ? 'Confirm Password should be atleast 6 characters'
                          : 'Confirm Password is required'
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
              Already have an account? &nbsp;
              <NextLink href={`/login?redirect=${redirect || '/'}`} passHref>
                <Link>Login</Link>
              </NextLink>
            </ListItem>
          </List>
        </form>
      </Layout>
    );
  }
}
