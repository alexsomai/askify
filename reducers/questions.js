import { ADD_QUESTION, VOTE_QUESTION, DONE_QUESTION, QUESTIONS_SUCCESS } from '../constants/ActionTypes'

function updateQuestion(state = [], action) {
  const question = action.payload

  switch (action.type) {
    case ADD_QUESTION:
      return [...state, question]
    case VOTE_QUESTION:
      return state.map(item =>
        item.id === question.id
          ? Object.assign({}, item, { votes: question.votes, voted_by: question.voted_by })
          : item
      )
    case DONE_QUESTION:
      return state.map(item =>
        item.id === question.id
          ? Object.assign({}, item, { done: question.done })
          : item
      )
    default:
      return state
  }
}

export default function questions(state = {}, action) {
  switch (action.type) {
    case QUESTIONS_SUCCESS:
      return Object.assign({}, state, action.response)

    case ADD_QUESTION:
    case VOTE_QUESTION:
    case DONE_QUESTION:
      const room = action.payload.room
      return Object.assign({}, state, {
        [room]: updateQuestion(state[room], action)
      })

    default:
      return state
  }
}
