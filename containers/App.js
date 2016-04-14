import React, { Component } from 'react'
import JoinRoom from '../components/JoinRoom'
import AddRoom from '../components/AddRoom'
import SignIn from '../components/SignIn'
import { browserHistory } from 'react-router'
import { AUTH0_CLIENT_ID, AUTH0_DOMAIN } from '../constants/Auth0Variables'
import Avatar from 'material-ui/lib/avatar';

function createLock() {
  return new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN);
}

function showLock(lock) {
  lock.show()
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
    return token
}

export default class App extends Component {
  constructor(props) {
      super(props)
      this.showLock = this.showLock.bind(this)
  }

  componentWillMount() {
    let lock = createLock()
    this.state = { lock: lock, token: getToken(lock) }
  }

  componentDidMount() {
    let lock = this.state.lock
    let token = localStorage.getItem('id_token')
    console.log(`id_token: ${token}`)
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

  joinRoom(roomValue) {
    if(!roomValue) {
      return
    }
    browserHistory.push(`/${roomValue}`)
  }

  render() {
    const token = localStorage.getItem('id_token')
    if (!token) {
      return (
        <div>
          <SignIn signIn={this.showLock} />
        </div>
      )
    }

    return (
      <div>
        <JoinRoom onSubmit={this.joinRoom}/>
        <AddRoom />
      </div>
    )
  }
}
