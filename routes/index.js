import React from 'react'
import App from '../containers/App'
import AppBar from '../containers/AppBar'
import Auth from '../containers/Auth'
import ConferenceRoom from '../containers/ConferenceRoom'
import { Redirect, Route, Switch } from 'react-router'

/**
 * Class representing a route that checks if user is logged in.
 * @extends Route
 */
class AuthRequiredRoute extends Route {

  hasToken() {
    return localStorage.getItem('id_token');
  }

  render() {
    if (!this.hasToken()) {
      return <Redirect to="/auth" />
    }

    return <this.props.component {...this.props} />
  }
}

const routes = (
  <div>
    <AppBar />
    <Switch>
      <AuthRequiredRoute exact path="/" component={App} />
      <Route path="/auth" component={Auth} />
      <AuthRequiredRoute path="/:room" component={ConferenceRoom} />
    </Switch>
  </div>
);

export default routes
