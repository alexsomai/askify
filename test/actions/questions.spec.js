import expect from 'expect'
import * as actions from '../../actions'
import * as types from '../../constants/ActionTypes'

describe('actions', () => {
  it('should create an action to add a question', () => {
    const question = {
      room: 'redux-room',
      text: 'Why is Redux better than Flux?',
      username: 'alexsomai'
    }
    const expectedAction = {
      type: types.ADD_QUESTION,
      payload: question
    }
    expect(actions.addQuestion(question)).toEqual(expectedAction)
  })

  it('should create an action to vote a question', () => {
    const question = {
      votes: 2
    }
    const expectedAction = {
      type: types.VOTE_QUESTION,
      payload: question
    }
    expect(actions.voteQuestion(question)).toEqual(expectedAction)
  })

  it('should create an action to mark a question as done', () => {
    const question = {
      done: true
    }
    const expectedAction = {
      type: types.DONE_QUESTION,
      payload: question
    }
    expect(actions.doneQuestion(question)).toEqual(expectedAction)
  })
})
