import React, { Component } from 'react'
import AuthComponent from '../components/AuthComponent'
import * as LoginActions from '../actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Redirect } from "react-router";

class Auth extends Component {
  constructor(props) {
    super(props)
    this.state = { login: true }
  }

  showSignUp() {
    if (this.props.auth.isFetching) {
      return
    }
    this.setState({
      login: false
    })
  }

  showLogin() {
    if (this.props.auth.isFetching) {
      return
    }
    this.setState({
      login: true
    })
  }

  render() {
    const { auth, actions } = this.props
    if (auth.isAuthenticated) {
      return <Redirect to="/" />;
    }

    const isLogin = this.state.login
    const login = isLogin ?
      {
        linkText: 'I do not have an account',
        linkTo: this.showSignUp.bind(this),
        buttonLabel: 'Login',
        onAuth: actions.loginUser,
        loadingMessage: 'Logging in ...'
      } :
      {
        linkText: 'I already have an account',
        linkTo: this.showLogin.bind(this),
        buttonLabel: 'Sign Up',
        onAuth: actions.registerUser,
        loadingMessage: 'Signing up ...'
      }

    return (
      <div>
        <AuthComponent
          linkText={login.linkText}
          linkTo={login.linkTo}
          buttonLabel={login.buttonLabel}
          onSubmitClick={login.onAuth}
          isFetching={auth.isFetching}
          loadingMessage={login.loadingMessage}
          errorMessage={auth.errorMessage} />
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(LoginActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth)
