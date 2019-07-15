import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SmallSpinner from './SmallSpinner'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing(1)
  },
  textField: {
    margin: theme.spacing(1),
    display: 'block'
  },
  alignLeft: {
    textAlign: 'left'
  },
  errorMessage: {
    color: 'red'
  }
});

class AuthComponent extends Component {
  constructor(props) {
    super(props);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = { username: '', password: '' }
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value })
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value })
  }

  handleClick() {
    const username = this.state.username.trim();
    const password = this.state.password.trim();
    if (!username || !password) {
      return
    }
    this.props.onSubmitClick({ username, password })
  }

  render() {
    const { classes, isFetching, loadingMessage, errorMessage } = this.props;

    return (
      <div className="center">
        {isFetching && <div><p>{loadingMessage}</p><SmallSpinner /></div>}

        {errorMessage && <p className={classes.errorMessage}>{errorMessage}</p>}

        <TextField
          label="Username"
          onChange={this.handleUsernameChange}
          className={classes.textField}
        />

        <TextField
          label="Password"
          type="password"
          onChange={this.handlePasswordChange}
          className={classes.textField}
        />

        <div className={classes.alignLeft}>
          <p onClick={this.props.linkTo}>{this.props.linkText}</p>
        </div>

        <Button variant="contained" color="primary" onClick={this.handleClick}
                disabled={isFetching} className={classes.button}>
          {this.props.buttonLabel}
        </Button>
      </div>
    )
  }
}

AuthComponent.propTypes = {
  linkTo: PropTypes.func.isRequired,
  linkText: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  onSubmitClick: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  loadingMessage: PropTypes.string,
  errorMessage: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AuthComponent);
