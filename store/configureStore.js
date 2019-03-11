import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import sequenceAction from 'redux-sequence-action';
import api from '../middleware/api'
import rootReducer from '../reducers'
import DevTools from '../containers/DevTools'

export const history = createBrowserHistory();

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer(history),
    initialState,
    compose(
      applyMiddleware(routerMiddleware(history), thunk, api, sequenceAction),
      DevTools.instrument()
    ));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
