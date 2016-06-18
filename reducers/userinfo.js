import { USERINFO_REQUEST, USERINFO_SUCCESS, USERINFO_FAILURE } from '../constants/ActionTypes'

export default function userinfo(state = { isFetching: false }, action) {
  switch (action.type) {
    case USERINFO_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case USERINFO_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.response
      })
    case USERINFO_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.error
      })
    default:
      return state
    }
}
