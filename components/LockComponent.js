import React, { Component, PropTypes } from 'react'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'

export default class LockComponent extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="center">
        <TextField
         floatingLabelText="Username" />
        <br/>
        <TextField
          floatingLabelText="Password"
          type="password" />
        <br/>
        <br/>
        <div style={{ textAlign: 'left' }}>
          <p onClick={this.props.linkTo}>{this.props.linkText}</p>
        </div>
        <br/>
        <RaisedButton
          label={this.props.buttonLabel}
          primary={true} />
      </div>
    )
  }
}

LockComponent.propTypes = {
  linkTo: PropTypes.func.isRequired,
  linkText: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string.isRequired
}
