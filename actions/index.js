import * as types from '../constants/ActionTypes'

/* TEMPORARY */
export function getAllQuestions(room) {
  return dispatch => {
    fetch(`questions${room}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        return response.json()
      }
    }).then(questions => {
      dispatch(receiveQuestions(questions))
    })
  }
}

/* TEMPORARY */
function receiveQuestions(questions) {
  return {
    type: "RECEIVE_QUESTIONS",
    questions: questions
  }
}

export function addQuestion(question) {
  return { type: types.ADD_QUESTION, payload: question }
}

export function voteQuestion(question) {
  return { type: types.VOTE_QUESTION, payload: question }
}
