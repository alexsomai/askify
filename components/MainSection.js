import React, { Component, PropTypes } from 'react'
import Rx from 'rx'
import io from 'socket.io-client'
import QuestionItem from './QuestionItem.js'

const socket = io()
const createStream = Rx.Observable.fromEvent(socket, 'create')
const updateStream = Rx.Observable.fromEvent(socket, 'update')

export default class MainSection extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { actions } = this.props
    createStream.subscribe(payload => {
      console.log(`payload from RX ${JSON.stringify(payload)}`)
      actions.addQuestion(payload.id, payload.text)
    })
    updateStream.subscribe(payload => {
      console.log(`update paylod from RX ${JSON.stringify(payload)}`)
      actions.voteQuestion(payload.id, payload.votes)
    })
  }

  render() {
    const { questions, actions } = this.props
    let number = 0
    console.log(questions);
    return (
      <div>
          {questions
            .sort((a, b) => b.votes - a.votes)
            .map(question =>
              <QuestionItem key={question.id} question={question}/>
          )}
      </div>
    )
  }
}

MainSection.propTypes = {
  questions: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}
