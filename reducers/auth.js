import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../constants/ActionTypes'

// The auth reducer. The starting state sets authentication based on a token
// being in local storage. In a real app, we would also want a util to check if
// the token is expired.
export default function auth(state = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('id_token') ? true : false
  }, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        user: action.creds,
      })
    case LOGIN_SUCCESS:
      localStorage.setItem('id_token', action.response.id_token)
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: '',
      })
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.error
      })
    default:
      return state
    }
}
