import React, { Component } from 'react'
import PropTypes from 'prop-types'
import QuestionItem from './QuestionItem'
import LargeSpinner from './LargeSpinner'
import LoadingComponent from './LoadingComponent'

const style = {
  position: 'absolute',
  left: '50%',
  transform: 'translate(-50%)'
}

export default class MainSection extends Component {
  render() {
    const {
      questions, isFetching, isSubmitting, isUpdating,
      errorMessage, submittingErrorMessage, updatingErrorMessage,
      loadingLabel, emptyRoomLabel, onVoteQuestion, onDoneQuestion, userinfo
    } = this.props

    if (isFetching) {
      return (
        <div style={style}>
          <h1><i>{loadingLabel}</i></h1>
          <LargeSpinner />
        </div>
      )
    }

    if (errorMessage) {
      return (
        <div style={style}>
          <h1 style={{ color: 'red' }}>
            Failed to fetch questions, reason: '{errorMessage}'
          </h1>
          <LoadingComponent
            isSubmitting={isSubmitting}
            isUpdating={isUpdating}
            submittingErrorMessage={submittingErrorMessage}
            updatingErrorMessage={updatingErrorMessage}
            />
        </div>
      )
    }

    if (questions.length === 0) {
      return (
        <div style={style}>
          <h1>{emptyRoomLabel}</h1>
          <LoadingComponent
            isSubmitting={isSubmitting}
            isUpdating={isUpdating}
            submittingErrorMessage={submittingErrorMessage}
            updatingErrorMessage={updatingErrorMessage}
            />
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
            const thumbUpDisabled = question.voted_by.includes(userinfo.id) ||
              question.done || isUpdating
            const doneDisabled = question.user_id !== userinfo.id || isUpdating
            return <QuestionItem
                    key={question.id}
                    question={question}
                    onThumbUp={onVoteQuestion}
                    onDone={onDoneQuestion}
                    thumbUpDisabled={thumbUpDisabled}
                    doneDisabled={doneDisabled} />
          }
        )}
        <LoadingComponent
          isSubmitting={isSubmitting}
          isUpdating={isUpdating}
          submittingErrorMessage={submittingErrorMessage}
          updatingErrorMessage={updatingErrorMessage}
          />
      </div>
    )
  }
}

MainSection.propTypes = {
  questions: PropTypes.array,
  userinfo: PropTypes.object,
  isFetching: PropTypes.bool,
  isSubmitting: PropTypes.bool,
  isUpdating: PropTypes.bool,
  loadingLabel: PropTypes.string.isRequired,
  emptyRoomLabel: PropTypes.string.isRequired,
  onVoteQuestion: PropTypes.func.isRequired,
  onDoneQuestion: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  submittingErrorMessage: PropTypes.string,
  updatingErrorMessage: PropTypes.string
}

MainSection.defaultProps = {
  questions: [],
  userinfo: {}
}
