import { ADD_QUESTION, VOTE_QUESTION } from '../constants/ActionTypes'
import merge from 'lodash/merge'

export default function questions(state = {}, action) {
  if (action.response) {
    // this is the initial request, when are fetched all the questions from the API
    return merge({}, state, action.response)
  }

  const question = action.payload
  switch (action.type) {

    case ADD_QUESTION:
    console.log(question);
      state[question.room].push({
        id: question.id,
        text: question.text,
        votes: question.votes,
        nickname: question.nickname,
        picture: question.picture
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
