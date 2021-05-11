import { withStyles, TextField, Button } from '@material-ui/core';
import React from 'react';
import { format } from 'date-fns';
import {

  KeyboardDatePicker, MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

// import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';

// import { createPost } from '../actions';

const useStyles = (theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      fontSize: '0.5em',
    },
  },
});

class NewAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '', lastname: '', home: '', quote: '', major: '', selectedDate: '1/23/1998',
    };
  }

  handleChange(e, type) {
    if (type === 'firstname') {
      this.setState((prevState) => ({ ...prevState, firstname: e.target.value }));
    } else if (type === 'quote') {
      this.setState((prevState) => ({ ...prevState, quote: e.target.value }));
    } else if (type === 'home') {
      this.setState((prevState) => ({ ...prevState, home: e.target.value }));
    } else if (type === 'major') {
      this.setState((prevState) => ({ ...prevState, major: e.target.value }));
    } else if (type === 'lastname') {
      this.setState((prevState) => ({ ...prevState, lastname: e.target.value }));
    } else if (type === 'date') {
      this.setState((prevState) => ({ ...prevState, selectedDate: format(e, 'MM/dd/yyyy') }));
    }
  }

  // onClickSubmit() {
  //   if (this.onCheckInput()) {
  //     this.props.createPost({
  //       firstname: this.state.firstname,
  //       lastnames: `${this.state.home},0,${this.state.lastname}`,
  //       coverUrl: this.state.major,
  //       quote: this.state.quote,
  //     }, this.props.history);
  //   }
  // }

  onCheckInput() {
    return this.onCheckValidLastname() && this.onCheckValidFirstname()
    && this.onCheckValidHome() && this.isValidHttpUrl();
  }

  onCheckValidLastname() {
    if (/\s/.test(this.state.lastname) || this.state.lastname.length < 3 || this.state.lastname.length > 15) {
      return false;
    }
    return true;
  }

  onCheckValidFirstname() {
    if (this.state.firstname.length < 3 || this.state.firstname.length > 30) {
      return false;
    }
    return true;
  }

  onCheckValidHome() {
    if (this.state.home.length < 3 || this.state.home.length > 20) {
      return false;
    }
    return true;
  }

  isValidHttpUrl() {
    let url;

    try {
      url = new URL(this.state.major);
    } catch (_) {
      return false;
    }

    return url.protocol === 'http:' || url.protocol === 'https:';
  }

  render() {
    const { classes } = this.props;
    return (
      <form className={classes.root} noValidate autoComplete="off">
        <div id="form">
          <div id="formTop">
            <h3>Join us now!</h3>
            <Button onClick={() => this.onClickSubmit()} variant="contained" color="primary">Submit</Button>
          </div>
          <TextField
            id="firstname_field"
            label="Firstname"
            value={this.state.firstname}
            onChange={(e) => this.handleChange(e, 'firstname')}
            variant="filled"
            error={this.state.firstname !== '' && !this.onCheckValidFirstname()}
            helperText={this.state.firstname !== '' && !this.onCheckValidFirstname() ? 'Firstname must be between 3 to 30 characters' : null}
            margin="dense"
          />
          <TextField
            id="lastname_field"
            label="Lastname"
            value={this.state.lastname}
            onChange={(e) => this.handleChange(e, 'lastname')}
            variant="filled"
            error={this.state.lastname !== '' && !this.onCheckValidLastname()}
            helperText={this.state.lastname !== '' && !this.onCheckValidLastname() ? 'Firstname must be between 3 to 15 characters and cannot have whitespaces' : null}
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
              value={this.state.selectedDate}
              onChange={(e) => this.handleChange(e, 'date')}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              InputProps={{ readOnly: true }}
              autoOk
            />
          </MuiPickersUtilsProvider>
          <TextField
            id="home_field"
            label="Home"
            value={this.state.home}
            onChange={(e) => this.handleChange(e, 'home')}
            variant="filled"
            error={this.state.home !== '' && !this.onCheckValidHome()}
            helperText={this.state.home !== '' && !this.onCheckValidHome() ? 'Home must be between 3 to 20 characters' : null}
            margin="dense"
          />
          <TextField
            id="major_field"
            label="Major"
            value={this.state.major}
            onChange={(e) => this.handleChange(e, 'major')}
            variant="filled"
            placeholder="Major including https://"
            error={this.state.major !== '' && !this.isValidHttpUrl()}
            helperText={this.state.major !== '' && !this.isValidHttpUrl() ? 'Provide full valid url address including https:// or http://' : null}
            margin="dense"
          />
          <TextField
            id="quote_field"
            label="Favorite Quote"
            multiline
            rows={3}
            value={this.state.quote}
            onChange={(e) => this.handleChange(e, 'quote')}
            placeholder="Supports markdown!"
            variant="filled"
            margin="dense"
          />

        </div>
      </form>
    );
  }
}

// export default withRouter(connect(null, { createPost })(withStyles(useStyles)(NewPost)));
export default withStyles(useStyles)(NewAccount);
