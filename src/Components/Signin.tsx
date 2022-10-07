import React, { useState } from 'react';
import { Alert, FormControlLabel, Grid, Link } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { LoginData } from './Login';

const theme = createTheme();

export default function SignIn(props: SignInPropsInterface) {
  const [isEmailError, setIsEmailError] = useState(false),
    [isPasswordError, setIsPasswordError] = useState(false),
    [emailErrorText, setEmailErrorText] = useState(""),
    [passwordErrorText, setPasswordErrorText] = useState(""),
    [showLoginError, setShowLoginError] = useState(false);

  const validate = ({ userName, passWd }: LoginData) => {
    if (userName === "") {
      setIsEmailError(true);
      setEmailErrorText("Email is required");
      return false;
    }

    if (passWd === "") {
      setIsPasswordError(true);
      setPasswordErrorText("Password is required");
      return false;
    }

    return true;
  }


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowLoginError(true)
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    const loginData: LoginData = {
      userName: data.get('email')?.toString() ?? "",
      passWd: data.get('password')?.toString() ?? "",
    }

    if (validate(loginData)) {
      props.loginClicked(loginData);
    }
  };

  const onFocus = () => {
    setShowLoginError(false);
    setIsEmailError(false);
    setIsPasswordError(false);
  };







  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          </Avatar>
          <h5>
            Sign in
          </h5>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={isEmailError}
              helperText={emailErrorText}
              onFocus={onFocus}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={isPasswordError}
              helperText={passwordErrorText}
              onFocus={onFocus}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            {props.invalidLogin && showLoginError && (<Alert severity="error">Invalid login credentials!</Alert>)}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export interface SignInPropsInterface {
  loginClicked: (loginData: LoginData) => void;
  invalidLogin: boolean;
}