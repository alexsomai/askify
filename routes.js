import React from 'react'
import { Route } from 'react-router'
import App from './containers/App'
import Lock from './containers/Lock'
import ConferenceRoom from './containers/ConferenceRoom'

function requireAuth(nextState, replace) {
  const token = localStorage.getItem('id_token')
  if (!token) {
    replace({
      pathname: '/lock'
    })
  }
}

export default (
  <div>
    <Route path="/" component={App} onEnter={requireAuth} />
    <Route path="/lock" component={Lock} />
    <Route path="/:room" component={ConferenceRoom} onEnter={requireAuth} />
  </div>
)
