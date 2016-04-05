import React from 'react'
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Root from './containers/Root'
import configureStore from './store/configureStore'
import { getAllQuestions } from './actions'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

/* WORST APPROACH! This is a TEMPORARY solution to populate the initial store.
Later, redux middleware should be used! Also remove the afferent action methods
and reducer switch case marked with 'TEMPORARY' */
store.dispatch(getAllQuestions())

render(
  <Root store={store} history={history} />,
  document.getElementById('app')
)
