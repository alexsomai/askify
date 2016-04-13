import React, { Component, PropTypes } from 'react'
import RaisedButton from 'material-ui/lib/raised-button'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center'
}

export default class SignIn extends Component {
  render() {
    return (
      <div style={style}>
        <RaisedButton
          label="Sign In"
          primary={true}
          onClick={this.props.signIn} />
      </div>
    )
  }
}

SignIn.propTypes = {
  signIn: PropTypes.func.isRequired
}
