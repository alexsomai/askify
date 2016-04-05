import React, { Component, PropTypes } from 'react'
import QuestionItem from './QuestionItem'
import { Link } from 'react-router'

const style = {
  position: 'absolute',
  left: '50%',
  transform: 'translate(-50%)'
}

export default class MainSection extends Component {
  render() {
    const { questions, actions, room } = this.props
    return (
      <div style={style}>
        <Link to="/">Home</Link>
        {questions
          .filter(item => item.room === room)
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
  actions: PropTypes.object.isRequired,
  room: PropTypes.string.isRequired
}
