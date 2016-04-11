import React, { Component, PropTypes } from 'react'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center'
}

export default class JoinRoom extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = { text: '' }
  }

  handleChange(event) {
    this.setState({ text: event.target.value })
  }

  getInputValue() {
    return this.state.text.trim()
  }

  handleSubmit() {
    this.props.onSubmit(this.getInputValue())
  }

  render() {
    return (
      <div style={style}>
        <TextField
          id="join-room-text-field"
          value={this.state.text}
          onChange={this.handleChange}
          hintText="conference-room-1"
          floatingLabelText="Conference Room" />
        <br/>
        <RaisedButton
          label="Join"
          primary={true}
          onClick={this.handleSubmit}/>
      </div>
    )
  }
}

JoinRoom.propTypes = {
  onSubmit: PropTypes.func.isRequired
}
