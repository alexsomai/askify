import React from 'react'
import { Redirect, Route } from "react-router";

/**
 * Class representing a route that checks if user is logged in.
 * @extends Route
 */
export default class AuthRequiredRoute extends Route {

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
