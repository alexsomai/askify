import React, { Component, PropTypes } from 'react'
import QuestionItem from './QuestionItem.js'

export default class MainSection extends Component {
  render() {
    const { questions, actions } = this.props
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
