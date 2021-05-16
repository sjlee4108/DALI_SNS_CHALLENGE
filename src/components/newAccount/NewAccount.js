import { makeStyles, TextField, Button } from '@material-ui/core';
import React, { useState } from 'react';
import { format, differenceInYears } from 'date-fns';
import {
  KeyboardDatePicker, MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import './NewAccountStyles.scss';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { useAuth } from '../../firebase/AuthContext';
import { addUser } from '../../store/actions';

// import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';

// import { createPost } from '../actions';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(0.9),
      fontSize: '0.5em',
    },
  },
}));

const NewAccount = (props) => {
  // eslint-disable-next-line react/static-property-placement
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [quote, setQuote] = useState('');
  const [color, setColor] = useState('');
  const [selectedDate, setDate] = useState('01/23/1998');
  const [loading, setLoading] = useState(false);
  const [inputValidate, setInputValidate] = useState(false);
  const { signup } = useAuth();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const getAlertDialog = () => (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Account Creation Failed</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Please try again with a different email.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );

  const handleChange = (e, type) => {
    if (type === 'email') {
      setEmail(e.target.value.replace(/\s/g, ''));
    } else if (type === 'password') {
      setPassword(e.target.value.replace(/\s/g, ''));
    } else if (type === 'quote') {
      setQuote(e.target.value);
    } else if (type === 'year') {
      setYear(e.target.value);
    } else if (type === 'color') {
      setColor(e.target.value);
    } else if (type === 'name') {
      setName(e.target.value);
    } else if (type === 'date') {
      setDate(format(e, 'MM/dd/yyyy'));
    }
  };

  const onCheckValidName = () => {
    if (name.length < 5 || name.length > 40) {
      return false;
    }
    return true;
  };

  const onCheckValidEmail = () => RegExp('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$').test(email);

  const onCheckValidPassword = () => {
    if (password.length < 8) {
      return false;
    }
    return true;
  };

  const onCheckValidYear = () => {
    if (year.length !== 2) {
      return false;
    }
    if ('18'.localeCompare(year) === -1 && year.localeCompare('25') === -1) return true;
    return false;
  };

  const onCheckColor = () => color.length !== 0;

  const onCheckValidBday = () => differenceInYears(new Date(), new Date(selectedDate)) >= 15;

  const onCheckInput = () => onCheckValidName() && onCheckValidEmail()
    && onCheckValidYear() && onCheckColor() && onCheckValidBday() && onCheckValidPassword();

  const onClickSubmit = async (addUserFunc) => {
    if (onCheckInput()) {
      try {
        setInputValidate(false);
        setLoading(true);
        const { user } = await signup(email, password);
        addUserFunc(user.uid, {
          year, quote, birthday: selectedDate, name, color,
        });
      } catch (error) {
        setOpen(true);
        setLoading(false);
      }
    } else {
      setInputValidate(true);
    }
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      {getAlertDialog()}
      <div id="form">
        <div id="formTop">
          <h3>Join us now!</h3>
          <Button disabled={loading} onClick={() => onClickSubmit(props.addUser)} variant="contained" color="primary">Sign Up</Button>
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

        <TextField
          required
          id="name_field"
          label="Name"
          value={name}
          onChange={(e) => handleChange(e, 'name')}
          variant="filled"
          error={inputValidate && !onCheckValidName()}
          helperText={inputValidate && !onCheckValidName() ? '5 to 40 characters' : null}
          margin="dense"
          disabled={loading}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            inputVariant="filled"
            variant="inline"
            format="MM/dd/yyyy"
            margin="dense"
            id="date-picker-inline"
            label="Birthday"
            value={new Date(selectedDate)}
            onChange={(e) => handleChange(e, 'date')}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            helperText={inputValidate && !onCheckValidBday() ? 'Must be older than 14' : null}
            error={inputValidate && !onCheckValidBday()}
            InputProps={{ readOnly: true }}
            autoOk
            required
            disabled={loading}
          />
        </MuiPickersUtilsProvider>
        <TextField
          required
          id="year_field"
          label="Class Year"
          value={year}
          onChange={(e) => handleChange(e, 'year')}
          variant="filled"
          error={inputValidate && !onCheckValidYear()}
          helperText={inputValidate && !onCheckValidYear() ? 'Year must be between 19 to 24' : null}
          margin="dense"
          disabled={loading}
        />
        <TextField
          required
          id="color_field"
          label="Fav Color"
          value={color}
          onChange={(e) => {
            handleChange(e, 'color');
          }}
          variant="filled"
          placeholder="Favorite Color!"
          error={color === '' && inputValidate}
          helperText={color === '' && inputValidate ? 'Provide a color' : null}
          margin="dense"
          disabled={loading}
        />
        <TextField
          id="quote_field"
          label="Favorite Quote"
          multiline
          rows={2}
          value={quote}
          onChange={(e) => handleChange(e, 'quote')}
          placeholder={'"Any fun quotes??"'}
          variant="filled"
          margin="dense"
          disabled={loading}
        />

      </div>
    </form>
  );
};

// export default withRouter(connect(null, { createPost })(withStyles(useStyles)(NewPost)));
export default connect(null, { addUser })(NewAccount);
