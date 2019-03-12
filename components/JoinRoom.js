import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
      <div className="center">
        <TextField
          id="join-room-text-field"
          value={this.state.text}
          onChange={this.handleChange}
          placeholder="conference-room-1"
          label="Conference Room" />
        <br />
        <Button variant="contained" color="primary" onClick={this.handleSubmit} style={{ marginTop: 20 }}>
          Join
        </Button>
      </div>
    )
  }
}

JoinRoom.propTypes = {
  onSubmit: PropTypes.func.isRequired
}
