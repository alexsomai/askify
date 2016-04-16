import React from 'react'
import { Route } from 'react-router'
import App from './containers/App'
import Auth from './containers/Auth'
import ConferenceRoom from './containers/ConferenceRoom'

function requireAuth(nextState, replace) {
  const token = localStorage.getItem('id_token')
  if (!token) {
    replace({
      pathname: '/auth'
    })
  }
}

export default (
  <div>
    <Route path="/" component={App} onEnter={requireAuth} />
    <Route path="/auth" component={Auth} />
    <Route path="/:room" component={ConferenceRoom} onEnter={requireAuth} />
  </div>
)
