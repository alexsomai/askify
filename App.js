import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import DevTools from './containers/DevTools'
import { ConnectedRouter } from 'connected-react-router'
import routes from './routes'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'; // v1.x
import { MuiThemeProvider as V0MuiThemeProvider } from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import cyan from '@material-ui/core/colors/cyan';

const theme = createMuiTheme({
  /* theme for v1.x */
  palette: {
    primary: {
      light: cyan[300],
      main: cyan[500],
      dark: cyan[700],
      contrastText: '#fff',
    },
  }
});
const themeV0 = getMuiTheme({
  /* theme for v0.x */
});

export default class App extends Component {
  render() {
    const { store, history } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <V0MuiThemeProvider muiTheme={themeV0}>
          <Provider store={store}>
            <ConnectedRouter history={history}>
              {routes}
            </ConnectedRouter>
            <DevTools/>
          </Provider>
        </V0MuiThemeProvider>
      </MuiThemeProvider>
    )
  }
}

App.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
