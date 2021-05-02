import React from 'react';
import Button from '@material-ui/core/Button';
import { FcGoogle as Google } from 'react-icons/fc';
import { IoLogoWhatsapp as Logo } from 'react-icons/io';

export default function Login({ onSignIn }) {
  return (
    <div className="login">
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
    </div>
  );
}
