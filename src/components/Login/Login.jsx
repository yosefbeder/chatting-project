import React from 'react';
import Button from '@material-ui/core/Button';
import { FcGoogle as Google } from 'react-icons/fc';
import { SiGooglehangoutschat as Logo } from 'react-icons/si';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles({
  root: {
    marginLeft: '10px',
  },
});

export default function Login({ onSignIn, isLoading, error }) {
  const circleClasses = useStyles();
  return (
    <Paper elevation={5} className="login">
      {error && <Alert severity="error">{error}</Alert>}
      <Logo className="login__logo" />

      <p>
        You're not currently SIGNED IN, so SIGN IN first to be able to use the
        app.
      </p>
      <Button
        variant="outlined"
        startIcon={<Google />}
        className="login__btn"
        onClick={onSignIn}
      >
        Sign In with google
        {isLoading && (
          <CircularProgress size={20} className={circleClasses.root} />
        )}
      </Button>
    </Paper>
  );
}
