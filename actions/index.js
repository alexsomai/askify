import * as types from '../constants/ActionTypes'

/* TEMPORARY */
export function getAllQuestions() {
  return dispatch => {
    fetch('questions', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.ok) {
        return res.json()
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
