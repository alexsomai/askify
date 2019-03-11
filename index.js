import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import Root from './containers/Root'
import configureStore, { history } from './store/configureStore'
import { loadUserInfo } from './actions'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const store = configureStore();

store.dispatch(loadUserInfo());

ReactDOM.render(
  <MuiThemeProvider>
    <Root store={store} history={history} />
  </MuiThemeProvider>,
  document.getElementById('app')
);
