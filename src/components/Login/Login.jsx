import React from 'react';
import Button from '@material-ui/core/Button';
import { FcGoogle as Google } from 'react-icons/fc';
import { SiGooglehangoutschat as Logo } from 'react-icons/si';
import Paper from '@material-ui/core/Paper';

export default function Login({ onSignIn }) {
  return (
    <Paper elevation={5} className="login">
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
      </Button>
    </Paper>
  );
}
