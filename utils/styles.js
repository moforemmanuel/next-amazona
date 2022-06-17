import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  navbar: {
    backgroundColor: '#203040',
    '& a': {
      color: '#fff',
      marginLeft: 10,
    },
  },

  main: {
    minHeight: '80vh',
  },

  footer: {
    textAlign: 'center',
  },

  grow: {
    flexGrow: 1,
  },

  brand: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
  },

  section: {
    marginTop: 10,
    marginBottom: 10,
  },
  form: {
    maxWidth: 800,
    margin: '0 auto',
  },
  navbarButton: {
    color: '#ffffff',
    textTransform: 'initial',
  },
  transparentBackground: {
    backgroundColor: 'transparent',
  },
});

export default useStyles;
