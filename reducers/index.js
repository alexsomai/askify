import { combineReducers } from 'redux'
import questions from './questions'
import { routerReducer as routing } from 'react-router-redux'

const rootReducer = combineReducers({
  questions,
  routing
})

export default rootReducer
