import React from 'react'
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Root from './containers/Root'
import configureStore from './store/configureStore'
import { loadUserInfo } from './actions'
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

store.dispatch(loadUserInfo())

render(
  <Root store={store} history={history} />,
  document.getElementById('app')
)
