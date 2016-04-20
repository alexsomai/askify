import { ADD_QUESTION, VOTE_QUESTION, QUESTIONS_SUCCESS } from '../constants/ActionTypes'
import merge from 'lodash/merge'

function updateQuestion(state = {}, action) {
  const question = action.payload

  switch (action.type) {
    case ADD_QUESTION:
      state.push({
        id: question.id,
        text: question.text,
        votes: question.votes,
        voted_by: question.voted_by,
        username: question.username,
        picture: question.picture
      })
      return state
    case VOTE_QUESTION:
      return state.map(item =>
        item.id === question.id
          ? Object.assign({}, item, { votes: question.votes, voted_by: question.voted_by })
          : item
      )
    default:
      return state
  }
}

export default function questions(state = {}, action) {
  switch (action.type) {
    case QUESTIONS_SUCCESS:
      return merge({}, state, action.response)

    case ADD_QUESTION:
    case VOTE_QUESTION:
      const room = action.payload.room
      return merge({}, state, {
        [room]: updateQuestion(state[room], action)
      })

    default:
      return state
  }
}
