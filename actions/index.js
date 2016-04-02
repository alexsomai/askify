import * as types from '../constants/ActionTypes'

export function addQuestion(question) {
  return {
    type: types.ADD_QUESTION,
    question
  }
}
