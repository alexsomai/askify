import { ADD_QUESTION } from '../constants/ActionTypes'

export default function todos(state = [], action) {
  switch (action.type) {
    case ADD_QUESTION:
      return [
        ...state, {
          text: action.question.text
        }
      ]
    default:
      return state
  }
}
