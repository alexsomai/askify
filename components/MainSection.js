import React, { Component, PropTypes } from 'react'
import QuestionItem from './QuestionItem'

const style = {
  position: 'absolute',
  left: '50%',
  transform: 'translate(-50%)'
}

export default class MainSection extends Component {
  render() {
    const { questions, room, isFetching } = this.props

    if (isFetching) {
      return (
        <div style={style}>
          <h1><i>Loading questions from '{room}' conference room...</i></h1>
        </div>
      )
    }

    if (questions.length === 0) {
      return (
        <div style={style}>
          <h1>Conference room '{room}' has no questions yet</h1>
        </div>
      )
    }

    return (
      <div style={style}>
        {questions
          .sort((a, b) => b.votes - a.votes)
          .map(question =>
            <QuestionItem key={question.id} question={question} room={room}/>
        )}
      </div>
    )
  }
}

MainSection.propTypes = {
  questions: PropTypes.array,
  room: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired
}

MainSection.defaultProps = {
  questions: []
}
