import React, { Component } from 'react'
import JoinRoom from '../components/JoinRoom'
import AddRoom from '../components/AddRoom'

export default class App extends Component {

  render() {
    return (
      <div>
        <JoinRoom />
        <AddRoom />
      </div>
    )
  }
}
