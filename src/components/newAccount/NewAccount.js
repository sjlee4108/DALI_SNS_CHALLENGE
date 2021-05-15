import { withStyles, TextField, Button } from '@material-ui/core';
import React from 'react';
import { format, differenceInYears } from 'date-fns';
import {

  KeyboardDatePicker, MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import './NewAccountStyles.scss';
import { AuthContext } from '../../firebase/AuthContext';

// import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';

// import { createPost } from '../actions';

const useStyles = (theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(0.9),
      fontSize: '0.5em',
    },
  },
});

class NewAccount extends React.Component {
  // eslint-disable-next-line react/static-property-placement
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      email: '', password: '', name: '', year: '', quote: '', color: '', selectedDate: '1/23/1998', inputValidate: false,
    };
  }

  handleChange(e, type) {
    if (type === 'email') {
      this.setState((prevState) => ({ ...prevState, email: e.target.value.replace(/\s/g, '') }));
    } else if (type === 'password') {
      this.setState((prevState) => ({ ...prevState, password: e.target.value.replace(/\s/g, '') }));
    } else if (type === 'quote') {
      this.setState((prevState) => ({ ...prevState, quote: e.target.value }));
    } else if (type === 'year') {
      this.setState((prevState) => ({ ...prevState, year: e.target.value }));
    } else if (type === 'color') {
      this.setState((prevState) => ({ ...prevState, color: e.target.value }));
    } else if (type === 'name') {
      this.setState((prevState) => ({ ...prevState, name: e.target.value }));
    } else if (type === 'date') {
      this.setState((prevState) => ({ ...prevState, selectedDate: format(e, 'MM/dd/yyyy') }));
    }
  }

  async onClickSubmit() {
    if (this.onCheckInput()) {
      try {
        console.log(this.context);
        await this.context.signup(this.state.email, this.state.password);
      } catch (error) {
        alert(error);
      }
    } else {
      this.setState({ inputValidate: true });
    }
  }

  onCheckInput() {
    return this.onCheckValidName() && this.onCheckValidEmail()
    && this.onCheckValidYear() && this.onCheckColor() && this.onCheckValidBday();
  }

  onCheckValidName() {
    if (this.state.name.length < 5 || this.state.name.length > 40) {
      return false;
    }
    return true;
  }

  onCheckValidEmail() {
    return RegExp('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$').test(this.state.email);
  }

  onCheckValidPassword() {
    if (this.state.password.length < 8) {
      return false;
    }
    return true;
  }

  onCheckValidYear() {
    if (this.state.year.length !== 2) {
      return false;
    }
    if ('18'.localeCompare(this.state.year) === -1 && this.state.year.localeCompare('25') === -1) return true;
    return false;
  }

  onCheckColor() {
    return this.state.color.length !== 0;
  }

  onCheckValidBday() {
    return differenceInYears(new Date(), new Date(this.state.selectedDate)) >= 15;
  }

  render() {
    const { classes } = this.props;
    return (
      <form className={classes.root} noValidate autoComplete="off">
        <div id="form">
          <div id="formTop">
            <h3>Join us now!</h3>
            <Button onClick={() => this.onClickSubmit()} variant="contained" color="primary">Sign Up</Button>
          </div>
          <TextField
            required
            id="email_field"
            label="Email"
            type="email"
            value={this.state.email}
            onChange={(e) => this.handleChange(e, 'email')}
            variant="filled"
            error={this.state.inputValidate && !this.onCheckValidEmail()}
            helperText={this.state.inputValidate && !this.onCheckValidEmail() ? 'Provide a valid email' : null}
            margin="dense"
          />

          <TextField
            required
            id="password_field"
            label="Password"
            type="password"
            value={this.state.password}
            onChange={(e) => this.handleChange(e, 'password')}
            variant="filled"
            error={this.state.inputValidate && !this.onCheckValidPassword()}
            helperText={this.state.inputValidate && !this.onCheckValidPassword() ? 'More than 8 characters' : null}
            margin="dense"
          />

          <TextField
            required
            id="name_field"
            label="Name"
            value={this.state.name}
            onChange={(e) => this.handleChange(e, 'name')}
            variant="filled"
            error={this.state.inputValidate && !this.onCheckValidName()}
            helperText={this.state.inputValidate && !this.onCheckValidName() ? '5 to 40 characters' : null}
            margin="dense"
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
              value={new Date(this.state.selectedDate)}
              onChange={(e) => this.handleChange(e, 'date')}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              helperText={this.state.inputValidate && !this.onCheckValidBday() ? 'Must be older than 14' : null}
              error={this.state.inputValidate && !this.onCheckValidBday()}
              InputProps={{ readOnly: true }}
              autoOk
              required
            />
          </MuiPickersUtilsProvider>
          <TextField
            required
            id="year_field"
            label="Class Year"
            value={this.state.year}
            onChange={(e) => this.handleChange(e, 'year')}
            variant="filled"
            error={this.state.inputValidate && !this.onCheckValidYear()}
            helperText={this.state.inputValidate && !this.onCheckValidYear() ? 'Year must be between 19 to 24' : null}
            margin="dense"
          />
          <TextField
            required
            id="color_field"
            label="Fav Color"
            value={this.state.color}
            onChange={(e) => {
              this.handleChange(e, 'color');
            }}
            variant="filled"
            placeholder="Favorite Color!"
            error={this.state.color === '' && this.state.inputValidate}
            helperText={this.state.color === '' && this.state.inputValidate ? 'Provide a color' : null}
            margin="dense"
          />
          <TextField
            id="quote_field"
            label="Favorite Quote"
            multiline
            rows={2}
            value={this.state.quote}
            onChange={(e) => this.handleChange(e, 'quote')}
            placeholder={'"Any fun quotes??"'}
            variant="filled"
            margin="dense"
          />

        </div>
      </form>
    );
  }
}
NewAccount.contextType = AuthContext;

// export default withRouter(connect(null, { createPost })(withStyles(useStyles)(NewPost)));
export default withStyles(useStyles)(NewAccount);
