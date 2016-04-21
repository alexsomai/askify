import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import AppBar from './containers/AppBar'
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
    <Route path="/" component={AppBar}>
      <IndexRoute component={App} onEnter={requireAuth} />
      <Route path="/auth" component={Auth} />
      <Route path="/:room" component={ConferenceRoom} onEnter={requireAuth} />
    </Route>
  </div>
)
