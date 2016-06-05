import React, { Component, PropTypes } from 'react'
import SmallSpinner from './SmallSpinner'

const loadingStyle = visibility => {
  return {
    position: 'absolute',
    left: '50%',
    fontSize: 24,
    visibility: visibility,
    textAlign: 'center'
  }
}

const errorStyle = {
  color: 'red',
  textAlign: 'center'
}

export default class LoadingComponent extends Component {
  render() {
    const {
      isSubmitting, isUpdating,
      submittingErrorMessage, updatingErrorMessage,
    } = this.props

    const submitVisibility = isSubmitting ? 'visible' : 'hidden'
    const updateVisibility = isUpdating ? 'visible' : 'hidden'

    let submitErr = ''
    if (submittingErrorMessage) {
      submitErr = `Failed to submit question, reason: '${submittingErrorMessage}'`
    }
    let updateErr = ''
    if (updatingErrorMessage) {
      updateErr = `Failed to update question, reason: '${updatingErrorMessage}'`
    }

    return (
      <div>
        <div style={errorStyle}>
          {submitErr}
        </div>
        <div style={errorStyle}>
          {updateErr}
        </div>
        <div style={loadingStyle(submitVisibility)}>
          Submitting question...
          <SmallSpinner />
        </div>
        <div style={loadingStyle(updateVisibility)}>
          Updating question...
          <SmallSpinner />
        </div>
      </div>
    )
  }
}

LoadingComponent.propTypes = {
  isSubmitting: PropTypes.bool,
  isUpdating: PropTypes.bool,
  submittingErrorMessage: PropTypes.string,
  updatingErrorMessage: PropTypes.string
}
