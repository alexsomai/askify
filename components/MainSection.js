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
      questions, isFetching, errorMessage, loadingLabel,
      emptyRoomLabel, onVoteQuestion, onDoneQuestion,
      userinfo
    } = this.props

    if (errorMessage) {
      return (
        <div style={style}>
          <h1 style={{ color: 'red' }}>{errorMessage}</h1>
        </div>
      )
    }

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
          .sort((a, b) => {
            if (a.done !== b.done) {
              return b.done ? -1 : 1
            }
            if (a.votes !== b.votes) {
              return b.votes - a.votes
            }
            return new Date(a.created_at) - new Date(b.created_at)
          })
          .map(question => {
            const thumbUpDisabled = question.voted_by.includes(userinfo.id) || question.done
            const doneDisabled = question.user_id !== userinfo.id
            return <QuestionItem
                    key={question.id}
                    question={question}
                    onThumbUp={onVoteQuestion}
                    onDone={onDoneQuestion}
                    thumbUpDisabled={thumbUpDisabled}
                    doneDisabled={doneDisabled} />
          }
        )}
      </div>
    )
  }
}

MainSection.propTypes = {
  questions: PropTypes.array,
  userinfo: PropTypes.object,
  isFetching: PropTypes.bool,
  loadingLabel: PropTypes.string.isRequired,
  emptyRoomLabel: PropTypes.string.isRequired,
  onVoteQuestion: PropTypes.func.isRequired,
  onDoneQuestion: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
}

MainSection.defaultProps = {
  questions: []
}
