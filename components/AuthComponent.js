import React, { Component, PropTypes } from 'react'
import SmallSpinner from './SmallSpinner'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

export default class AuthComponent extends Component {
  constructor(props) {
    super(props)
    this.handleUsernameChange = this.handleUsernameChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.state = { username: '', password: '' }
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value })
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value })
  }

  handleClick() {
    const username = this.state.username.trim()
    const password = this.state.password.trim()
    if(!username || !password){
      return
    }
    this.props.onSubmitClick({ username, password })
  }

  render() {
    const { isFetching, loadingMessage, errorMessage } = this.props

    return (
      <div className="center">
        {isFetching &&
          <div>
            <p>{loadingMessage}</p>
            <SmallSpinner />
          </div>
        }
        {errorMessage &&
          <p style={{color:'red'}}>{errorMessage}</p>
        }
        <TextField ref="username"
         floatingLabelText="Username"
         onChange={this.handleUsernameChange} />
        <br/>
        <TextField ref="password"
          floatingLabelText="Password"
          type="password"
          onChange={this.handlePasswordChange} />
        <br/>
        <br/>
        <div style={{ textAlign: 'left' }}>
          <p onClick={this.props.linkTo}>{this.props.linkText}</p>
        </div>
        <br/>
        <RaisedButton
          label={this.props.buttonLabel}
          primary={true}
          onClick={this.handleClick}
          disabled={isFetching} />
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
  errorMessage: PropTypes.string
}
