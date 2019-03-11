import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import DevTools from './containers/DevTools'
import { ConnectedRouter } from 'connected-react-router'
import routes from './routes'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class App extends Component {
  render() {
    const { store, history } = this.props;
    return (
      <MuiThemeProvider>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            {routes}
          </ConnectedRouter>
          <DevTools />
        </Provider>
      </MuiThemeProvider>
    )
  }
}

App.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
