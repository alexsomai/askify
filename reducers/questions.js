import { ADD_QUESTION, VOTE_QUESTION } from '../constants/ActionTypes'

export default function todos(state = [], action) {
  switch (action.type) {
    case ADD_QUESTION:
      return [
        ...state, {
          id: action.id,
          text: action.text,
          votes: 0
        }
      ]

    case VOTE_QUESTION:
      return state.map(question =>
        question.id === action.id ?
          Object.assign({}, question, { votes: action.votes }) :
          question
      )

    default:
      return state
  }
}
