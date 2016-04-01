import { createStore, applyMiddleware } from 'redux'
// import thunk from 'redux-thunk'
// import api from '../middleware/api'
import counter from '../reducers'

export default function configureStore() {
  return createStore(counter)
}
