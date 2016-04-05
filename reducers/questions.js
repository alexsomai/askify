import { ADD_QUESTION, VOTE_QUESTION } from '../constants/ActionTypes'

export default function todos(state = [], action) {
  const question = action.payload

  switch (action.type) {

    /* TEMPORARY */
    case "RECEIVE_QUESTIONS":
      return state.concat(action.questions)

    case ADD_QUESTION:
      return [
        ...state, Object.assign({}, question)
      ]

    case VOTE_QUESTION:
      return state.map(item =>
        item.id === question.id ?
          Object.assign({}, item, { votes: question.votes }) :
          item
      )

    default:
      return state
  }
}
