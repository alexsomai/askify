import React from 'react'
import Home from '../containers/Home'
import AppBar from '../containers/AppBar'
import Auth from '../containers/Auth'
import ConferenceRoom from '../containers/ConferenceRoom'
import AuthRequiredRoute from '../components/AuthRequiredRoute'
import { Route, Switch } from 'react-router'

const routes = (
  <div>
    <AppBar />
    <Switch>
      <AuthRequiredRoute exact path="/" component={Home} />
      <Route path="/auth" component={Auth} />
      <AuthRequiredRoute path="/:room" component={ConferenceRoom} />
    </Switch>
  </div>
);

export default routes
