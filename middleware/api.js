export const API_ROOT = 'http://localhost:3001'

// Fetches an API response as json
function callApi(endpoint, config, authenticated) {
  const token = localStorage.getItem('id_token') || null
  if (authenticated) {
    if (token) {
      config = Object.assign({}, config, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
    } else {
      throw "No token saved!"
    }
  }

  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint

  return fetch(fullUrl, config)
    .then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json)
      }

      return Object.assign({}, json)
    })
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
  if(typeof config === 'undefined') {
    config = {}
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

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
}
