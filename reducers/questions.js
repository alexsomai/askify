import { ADD_QUESTION, VOTE_QUESTION } from '../constants/ActionTypes'
import merge from 'lodash/merge'

export default function todos(state = {}, action) {
  const question = action.payload

  switch (action.type) {

    /* TEMPORARY */
    case "RECEIVE_QUESTIONS":
      return merge({}, state, action.questions)

    case ADD_QUESTION:
      state[question.room].push({
        id: question.id,
        text: question.text,
        votes: question.votes
      })
      return Object.assign({}, state)

    case VOTE_QUESTION:
      state[question.room] = state[question.room].map(item =>
        item.id === question.id
        ? Object.assign({}, item, { votes: question.votes })
        : item)
      return Object.assign({}, state)

    default:
      return state
  }
}
