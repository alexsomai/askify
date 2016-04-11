import React, { Component, PropTypes } from 'react'
import QuestionItem from './QuestionItem'

const style = {
  position: 'absolute',
  left: '50%',
  transform: 'translate(-50%)'
}

export default class MainSection extends Component {
  render() {
    const {
      questions, isFetching, loadingLabel,
      emptyRoomLabel, onVoteQuestion
    } = this.props

    if (isFetching) {
      return (
        <div style={style}>
          <h1><i>{loadingLabel}</i></h1>
        </div>
      )
    }

    if (questions.length === 0) {
      return (
        <div style={style}>
          <h1>{emptyRoomLabel}</h1>
        </div>
      )
    }

    return (
      <div style={style}>
        {questions
          .sort((a, b) => b.votes - a.votes)
          .map(question =>
            <QuestionItem
              key={question.id}
              question={question}
              onThumbUp={onVoteQuestion} />
        )}
      </div>
    )
  }
}

MainSection.propTypes = {
  questions: PropTypes.array,
  isFetching: PropTypes.bool.isRequired,
  loadingLabel: PropTypes.string.isRequired,
  emptyRoomLabel: PropTypes.string.isRequired,
  onVoteQuestion: PropTypes.func.isRequired
}

MainSection.defaultProps = {
  questions: []
}
