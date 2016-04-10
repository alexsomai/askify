import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import api from '../middleware/api'
import rootReducer from '../reducers'
import DevTools from '../containers/DevTools'

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk, api),
      DevTools.instrument()
    ))

  return store
}
