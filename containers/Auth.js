import React, { Component, PropTypes } from 'react'
import AuthComponent from '../components/AuthComponent'
import App from './App'
import * as LoginActions from '../actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class Auth extends Component {
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
    const { auth, actions } = this.props
    if (auth.isAuthenticated) {
      return (
        <App />
      )
    }


    const login = this.state.login
    const linkText = login ? "I don't have an account" : 'I already have an account'
    const linkTo = login ? this.showSignUp.bind(this) : this.showLogin.bind(this)
    const buttonLabel = login ? 'Login' : 'Sign Up'

    return (
      <div>
        <AuthComponent
          linkText={linkText}
          linkTo={linkTo}
          buttonLabel={buttonLabel}
          onSubmitClick={actions.loginUser}
          errorMessage={auth.errorMessage} />
      </div>
    )
  }
}


function mapStateToProps(state, ownProps) {
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
