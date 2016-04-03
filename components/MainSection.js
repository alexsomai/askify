import React, { Component, PropTypes } from 'react'
import QuestionItem from './QuestionItem.js'

const style = {
  position: 'absolute',
  left: '50%',
  transform: 'translate(-50%)'
}

export default class MainSection extends Component {
  render() {
    const { questions, actions } = this.props
    return (
      <div style={style}>
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
