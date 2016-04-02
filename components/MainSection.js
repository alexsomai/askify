import React, { Component, PropTypes } from 'react'
import Rx from 'rx'
import io from 'socket.io-client'
import QuestionItem from './QuestionItem.js'

const socket = io()
const dataStream = Rx.Observable.fromEvent(socket, 'questions')

export default class MainSection extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { actions } = this.props
    dataStream.subscribe(payload => {
      console.log(`payload from RX ${JSON.stringify(payload)}`)
      actions.addQuestion(payload)
    })
  }

  render() {
    const { questions, actions } = this.props
    let number = 0
    console.log(questions);
    return (
      <div>
        <p>This will be the question?</p>
          {questions.map(question =>
            <QuestionItem key={number++} question={question}/>
          )}
      </div>
    )
  }
}

MainSection.propTypes = {
  questions: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}
