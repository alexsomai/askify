import React, { Component } from 'react'
import JoinRoom from '../components/JoinRoom'
import AddRoom from '../components/AddRoom'
import { browserHistory } from 'react-router'
import { AUTH0_CLIENT_ID, AUTH0_DOMAIN } from '../constants/Auth0Variables'

function createLock() {
  return new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN);
}

function getToken(lock) {
    let token = localStorage.getItem('id_token');
    let authHash = lock.parseHash(window.location.hash);
    if (!token && authHash) {

      if (authHash.id_token) {
        token = authHash.id_token
        localStorage.setItem('id_token', authHash.id_token);
      }

      if (authHash.error) {
        console.log("Error signing in", authHash);
      }
    }
    console.log(token);
    return token
}

function showLock(lock) {
  lock.show()
}

export default class App extends Component {
  constructor(props) {
      super(props)
  }

  componentWillMount() {
    let lock = createLock()
    this.state = { lock: lock, token: getToken(lock) }
  }

  componentDidMount() {
    let lock = this.state.lock
    let token = localStorage.getItem('id_token')
    console.log(lock);
    console.log(token);
    if (token) {
      lock.getProfile(token, (err, profile) => {
      if (err) {
        console.log('Cannot get user :(', err)
        return;
      }

      console.log("Hey dude", profile);
    })
    }
  }

  showLock() {
    showLock(this.state.lock)
  }

  logOut() {
    window.location = `https://${AUTH0_DOMAIN}/v2/logout?returnTo=${encodeURIComponent('http://localhost:3000')}`
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
        <button onClick={this.showLock.bind(this)}>Sign In</button>
        <button onClick={this.logOut.bind(this)}>Log Out</button>
      </div>
    )
  }
}
