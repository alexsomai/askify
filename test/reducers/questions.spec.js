import expect from 'expect'
import reducer from '../../reducers/questions'
import * as types from '../../constants/ActionTypes'

describe('questions reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({})
  })

  const question = {
    id: 1,
    room: 'redux-room',
    text: 'What is Redux?',
    votes: 0,
    voted_by: [],
    username: 'alexsomai',
    done: false
  }
  const newQuestion = {
    id: 2,
    room: 'redux-room',
    text: 'Do I need to use Redux in my app?',
    votes: 0,
    voted_by: [],
    username: 'alexsomai',
    done: false
  }
  it('should handle ADD_QUESTION', () => {
    expect(
      reducer({}, {
        type: types.ADD_QUESTION,
        payload: question
      })
    ).toEqual(
      {
        'redux-room': [ question ]
      }
    )

    expect(
      reducer({ 'redux-room': [question] }, {
        type: types.ADD_QUESTION,
        payload: newQuestion
      })
    ).toEqual(
      {
        'redux-room': [ question, newQuestion ]
      }
    )
  })

  it('should handle VOTE_QUESTION', () => {
    expect(
      reducer({ 'redux-room': [question] }, {
        type: types.VOTE_QUESTION,
        payload: { id: 1, room: 'redux-room', votes: 1, voted_by: [12] }
      })
    ).toEqual(
      {
        'redux-room': [
          Object.assign({}, question, { votes: 1, voted_by: [12] })
        ]
      }
    )
  })

  it('should handle DONE_QUESTION', () => {
    expect(
      reducer({ 'redux-room': [question] }, {
        type: types.DONE_QUESTION,
        payload: { id: 1, room: 'redux-room', done: true }
      })
    ).toEqual(
      {
        'redux-room': [
          Object.assign({}, question, { done: true })
        ]
      }
    )
  })
})
