import { combineReducers } from 'redux'
import questions from './questions'
import checkStatus from './status'
import { routerReducer as routing } from 'react-router-redux'
import * as ActionTypes from '../constants/ActionTypes'

const status = combineReducers({
  questions: checkStatus({
    types: [
      ActionTypes.QUESTIONS_REQUEST,
      ActionTypes.QUESTIONS_SUCCESS,
      ActionTypes.QUESTIONS_FAILURE
    ],
    mapActionToKey: action => action.room
  })
})

const rootReducer = combineReducers({
  questions,
  status,
  routing
})

export default rootReducer
