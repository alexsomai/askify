import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import DevTools from './containers/DevTools'
import { ConnectedRouter } from 'connected-react-router'
import routes from './routes'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'; // v1.x
import cyan from '@material-ui/core/colors/cyan';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: cyan[300],
      main: cyan[500],
      dark: cyan[700],
      contrastText: '#fff',
    },
  }
});

export default class App extends Component {
  render() {
    const { store, history } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            {routes}
          </ConnectedRouter>
          <DevTools/>
        </Provider>
      </MuiThemeProvider>
    )
  }
}

App.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
