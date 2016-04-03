import React from 'react'
import { Route } from 'react-router'
import App from './containers/App'
import ConferenceRoom from './containers/ConferenceRoom'

export default (
  <div>
    <Route path="/" component={App} />
    <Route path="/:room" component={ConferenceRoom} />
  </div>
)
