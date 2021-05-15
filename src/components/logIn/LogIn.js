import { makeStyles, TextField, Button } from '@material-ui/core';
import React, { useState } from 'react';

import './LogInStyles.scss';
import { useAuth } from '../../firebase/AuthContext';

// import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';

// import { createPost } from '../actions';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(0.9),
    },
  },
}));

const LogIn = () => {
  // eslint-disable-next-line react/static-property-placement
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [inputValidate, setInputValidate] = useState(false);
  const { login } = useAuth();
  const classes = useStyles();

  const handleChange = (e, type) => {
    if (type === 'email') {
      setEmail(e.target.value.replace(/\s/g, ''));
    } else if (type === 'password') {
      setPassword(e.target.value.replace(/\s/g, ''));
    }
  };

  const onCheckValidEmail = () => RegExp('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$').test(email);

  const onCheckValidPassword = () => {
    if (password.length < 8) {
      return false;
    }
    return true;
  };

  const onCheckInput = () => onCheckValidPassword() && onCheckValidEmail();

  const onClickSubmit = async () => {
    if (onCheckInput()) {
      try {
        setInputValidate(false);
        setLoading(true);
        await login(email, password);
      } catch (error) {
        alert(error);
        setLoading(false);
      }
    } else {
      setInputValidate(true);
    }
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div id="form">
        <div id="formTop">
          <h3>Welcome Back! Sign in here</h3>
        </div>
        <TextField
          required
          id="email_field"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => handleChange(e, 'email')}
          variant="filled"
          error={inputValidate && !onCheckValidEmail()}
          helperText={inputValidate && !onCheckValidEmail() ? 'Provide a valid email' : null}
          margin="dense"
          disabled={loading}
        />

        <TextField
          required
          id="password_field"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => handleChange(e, 'password')}
          variant="filled"
          error={inputValidate && !onCheckValidPassword()}
          helperText={inputValidate && !onCheckValidPassword() ? 'More than 8 characters' : null}
          margin="dense"
          disabled={loading}
        />
        <br />
        <Button disabled={loading} fullwidth="true" onClick={() => onClickSubmit()} variant="contained" color="primary">Sign In</Button>

      </div>
    </form>
  );
};

// export default withRouter(connect(null, { createPost })(withStyles(useStyles)(NewPost)));
export default LogIn;
