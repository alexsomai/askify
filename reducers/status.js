import merge from 'lodash/merge'

// Creates a reducer managing status, given the action types to handle,
// and a function telling how to extract the key from an action.
export default function checkStatus({ types, mapActionToKey }) {
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected types to be an array of three elements.')
  }
  if (!types.every(t => typeof t === 'string')) {
    throw new Error('Expected types to be strings.')
  }
  if (typeof mapActionToKey !== 'function') {
    throw new Error('Expected mapActionToKey to be a function.')
  }

  const [ requestType, successType, failureType ] = types

  function updateStatus(state = { isFetching: false }, action) {
    switch (action.type) {
      case requestType:
        return merge({}, state, {
          isFetching: true
        })
      case successType:
        return merge({}, state, {
          isFetching: false,
          errorMessage: ''
        })
      case failureType:
        return merge({}, state, {
          isFetching: false,
          errorMessage: action.error
        })
      default:
        return state
    }
  }

  return function updateStatusByKey(state = {}, action) {
    switch (action.type) {
      case requestType:
      case successType:
      case failureType:
        const key = mapActionToKey(action)
        if (typeof key !== 'string') {
          throw new Error('Expected key to be a string.')
        }
        return merge({}, state, {
          [key]: updateStatus(state[key], action)
        })
      default:
        return state
    }
  }
}
