import * as types from '../constants/ActionTypes'

export function addQuestion(id, text) {
  return { type: types.ADD_QUESTION, id, text }
}

export function voteQuestion(id, votes) {
  return { type: types.VOTE_QUESTION, id, votes }
}
