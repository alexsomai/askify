import React, { Component, PropTypes } from 'react'
import LockComponent from '../components/LockComponent'

export default class Lock extends Component {
  constructor(props) {
    super(props)
    this.state = { login: true }
  }

  showSignUp() {
    this.setState({
      login: false
    })
  }

  showLogin() {
    this.setState({
      login: true
    })
  }

  render() {
    const login = this.state.login
    const linkText = login ? "I don't have an account" : 'I already have an account'
    const linkTo = login ? this.showSignUp.bind(this) : this.showLogin.bind(this)
    const buttonLabel = login ? 'Login' : 'Sign Up'

    return (
      <div>
        <LockComponent linkText={linkText} linkTo={linkTo} buttonLabel={buttonLabel}/>
      </div>
    )
  }
}
