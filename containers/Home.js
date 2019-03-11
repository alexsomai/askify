import React, { Component } from 'react'
import JoinRoom from '../components/JoinRoom'
import { push } from 'connected-react-router'
import { connect } from "react-redux";

class Home extends Component {

  constructor(props) {
    super(props);
    this.joinRoomLocal = this.joinRoomLocal.bind(this)
  }

  joinRoomLocal(roomValue) {
    if (!roomValue) {
      return
    }

    this.props.push(`${roomValue}`)
  }

  render() {
    return (
      <div>
        <JoinRoom onSubmit={this.joinRoomLocal} />
      </div>
    )
  }
}

export default connect(null, { push })(Home)
