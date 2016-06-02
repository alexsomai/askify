import * as types from '../constants/ActionTypes'
import { CALL_API } from '../middleware/api'

function fetchUserInfo() {
  return {
    [CALL_API]: {
      types: [ types.USERINFO_REQUEST, types.USERINFO_SUCCESS, types.USERINFO_FAILURE ],
      endpoint: '/userinfo',
      authenticated: true
    }
  }
}

export function loadUserInfo() {
  return (dispatch, getState) => {
    const userinfo = getState().userinfo.data
    if (userinfo) {
      return null
    }
    const isAuthenticated = getState().auth.isAuthenticated
    if (!isAuthenticated) {
      return null
    }

    return dispatch(fetchUserInfo())
  }
}

function authUser(creds, endpoint) {
  return [
    {
      [CALL_API]: {
        types: [ types.AUTH_REQUEST, types.AUTH_SUCCESS, types.AUTH_FAILURE ],
        endpoint: endpoint,
        config: {
            method: 'POST',
            headers: { 'Content-Type':'application/x-www-form-urlencoded' },
            body: `username=${creds.username}&password=${creds.password}`
        }
      }
    },
    // load user info after he logs in
    // sequential dispatching is achieved with 'redux-sequence-action'
    (dispatch, getState) => {
      dispatch(loadUserInfo())
    }
  ]
}

export function registerUser(creds) {
  return (dispatch) => {
    return dispatch(authUser(creds, '/users'))
  }
}

export function loginUser(creds) {
  return (dispatch) => {
    return dispatch(authUser(creds, '/sessions/create'))
  }
}

// Fetches all the questions from the given room
// Relies on the custom API middleware defined in ../middleware/api.js.
function fetchQuestions(room) {
  return {
    room,
    [CALL_API]: {
      types: [ types.QUESTIONS_REQUEST, types.QUESTIONS_SUCCESS, types.QUESTIONS_FAILURE ],
      endpoint: `/questions/${room}`,
      authenticated: true
    }
  }
}

// Fetches all the questions from the given room unless they are cached.
// Relies on Redux Thunk middleware.
export function loadQuestions(room) {
  return (dispatch, getState) => {
    const questions = getState().questions[room]
    if (questions) {
      return null
    }

    return dispatch(fetchQuestions(room))
  }
}

export function addQuestionRequest(text, room) {
  return {
    payload: { room },
    [CALL_API]: {
      types: [ types.ADD_QUESTION_REQUEST, types.ADD_QUESTION_FAILURE ],
      endpoint: '/questions/',
      authenticated: true,
      config: {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, room })
      }
    }
  }
}

export function addQuestion(question) {
  return { type: types.ADD_QUESTION, payload: question }
}

export function voteQuestion(question) {
  return { type: types.VOTE_QUESTION, payload: question }
}

export function doneQuestion(question) {
  return { type: types.DONE_QUESTION, payload: question }
}
