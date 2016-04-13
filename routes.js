import React from 'react'
import { Route } from 'react-router'
import App from './containers/App'
import ConferenceRoom from './containers/ConferenceRoom'

function requireAuth(nextState, replace) {
  const token = localStorage.getItem('id_token')
  if (!token) {
    replace({
      pathname: '/'
    })
  }
}

export default (
  <div>
    <Route path="/" component={App} />
    <Route path="/:room" component={ConferenceRoom} onEnter={requireAuth} />
  </div>
)
