import React, { Component, PropTypes } from 'react'
import Rx from 'rx'
import io from 'socket.io-client'

const socket = io()
const dataStream = Rx.Observable.fromEvent(socket, 'questions')

export default class QuestionItem extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    dataStream.subscribe(payload => {
      console.log(`payload from RX ${JSON.stringify(payload)}`)
    })
  }

  render() {
    return (
      <div>
        <p>This will be the question?</p>
      </div>
    )
  }
}
