import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import ConferenceRoom from './ConferenceRoom.js'

export default class Root extends Component {
  render() {
    const { store } = this.props
    return (
      <Provider store={store}>
        <ConferenceRoom />
      </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
}
