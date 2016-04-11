import React, { Component } from 'react'
import JoinRoom from '../components/JoinRoom'
import AddRoom from '../components/AddRoom'
import { browserHistory } from 'react-router'

export default class App extends Component {
  constructor(props) {
      super(props)
  }

  joinRoom(roomValue) {
    if(!roomValue) {
      return
    }
    browserHistory.push(`/${roomValue}`)
  }

  render() {
    return (
      <div>
        <JoinRoom onSubmit={this.joinRoom}/>
        <AddRoom />
      </div>
    )
  }
}
