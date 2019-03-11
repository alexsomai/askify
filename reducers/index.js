import questions from './questions'
import checkStatus from './status'
import auth from './auth'
import userinfo from './userinfo'
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import * as ActionTypes from '../constants/ActionTypes'

const status = combineReducers({
  questions: checkStatus({
    types: [
      ActionTypes.QUESTIONS_REQUEST,
      ActionTypes.QUESTIONS_SUCCESS,
      ActionTypes.QUESTIONS_FAILURE
    ],
    mapActionToKey: action => action.room
  }),
  submitting: checkStatus({
    types: [
      ActionTypes.ADD_QUESTION_REQUEST,
      ActionTypes.ADD_QUESTION,
      ActionTypes.ADD_QUESTION_FAILURE
    ],
    mapActionToKey: action => action.payload.room
  }),
  voting: checkStatus({
    types: [
      ActionTypes.VOTE_QUESTION_REQUEST,
      ActionTypes.VOTE_QUESTION,
      ActionTypes.VOTE_QUESTION_FAILURE
    ],
    mapActionToKey: action => action.payload.room
  }),
  markingDone: checkStatus({
    types: [
      ActionTypes.DONE_QUESTION_REQUEST,
      ActionTypes.DONE_QUESTION,
      ActionTypes.DONE_QUESTION_FAILURE
    ],
    mapActionToKey: action => action.payload.room
  })
});

const rootReducer = (history) => combineReducers({
  questions,
  status,
  auth,
  userinfo,
  router: connectRouter(history)
});

export default rootReducer
