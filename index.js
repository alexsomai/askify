import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import configureStore, { history } from './store/configureStore'
import { loadUserInfo } from './actions'

const store = configureStore();

store.dispatch(loadUserInfo());

ReactDOM.render(
  <App store={store} history={history} />,
  document.getElementById('app')
);
