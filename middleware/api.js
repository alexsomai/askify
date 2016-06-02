import merge from 'lodash/merge'

export const API_ROOT = 'http://localhost:3001'

// Fetches an API response as json
function callApi(endpoint, config = {}, authenticated, parseResponse = true) {
  const token = localStorage.getItem('id_token') || null
  if (authenticated) {
    if (token) {
      config = merge({}, config, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
    } else {
      throw "No token saved!"
    }
  }

  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint

  if (parseResponse) {
    return fetch(fullUrl, config)
      .then(response =>
        response.json().then(json => ({ json, response }))
      ).then(({ json, response }) => {
        if (!response.ok) {
          return Promise.reject(json)
        }

        return Object.assign({}, json)
      })
  } else {
    return fetch(fullUrl, config)
      .then(response => {
        if (!response.ok) {
          return Promise.reject(json)
        }

        return response
      })
  }
}

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('Call API')

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const callAPI = action[CALL_API]
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { endpoint, config } = callAPI
  const { types, authenticated } = callAPI

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }
  if (!Array.isArray(types) || !(types.length === 2 || types.length === 3)) {
    throw new Error('Expected an array of two or three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  if (types.length === 3) {
    const [ requestType, successType, failureType ] = types
    next(actionWith({ type: requestType }))

    return callApi(endpoint, config, authenticated).then(
      response => next(actionWith({
        response,
        authenticated,
        type: successType
      })),
      error => next(actionWith({
        type: failureType,
        error: error.message || 'Something bad happened'
      }))
    )
  } else if (types.length === 2) {
    const [ requestType, failureType ] = types
    next(actionWith({ type: requestType }))

    return callApi(endpoint, config, authenticated, false).then(
      response => {/* do nothing, the response will be received on the WebSocket */},
      error => next(actionWith({
        type: failureType,
        error: error.message || 'Something bad happened'
      }))
    )
  }
}
