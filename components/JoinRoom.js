import React, { Component } from 'react'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'
import { browserHistory } from 'react-router'

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
    this.joinRoom = this.joinRoom.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {text: ''}
  }

  handleChange(event) {
    this.setState({text: event.target.value})
  }

  joinRoom() {
    browserHistory.push(this.state.text)
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
          onClick={this.joinRoom}/>
      </div>
    )
  }
}
