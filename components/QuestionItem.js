import React, { Component, PropTypes } from 'react'

import { Card, CardHeader, CardText } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'

const style = {
  container: {
    margin: '12px auto',
    width: '40vw'
  },
  undoneQuestion: {
    backgroundColor: 'inherit'
  },
  doneQuestion: {
    backgroundColor: '#b8b8b8',
    opacity: '.15'
  },
  header: {
    padding: '16px 0 0 16px'
  },
  text: {
    fontSize: 16
  }
}

export default class QuestionItem extends Component {
  constructor(props) {
    super(props)
    this.handleVote = this.handleVote.bind(this)
    this.handleDone = this.handleDone.bind(this)
  }

  handleVote() {
    this.props.onThumbUp(this.props.question)
  }

  handleDone() {
    this.props.onDone(this.props.question)
  }

  render() {
    const { question, thumbUpDisabled, doneDisabled } = this.props
    const votes = `${question.votes} votes`
    const doneQuestion = question.done
      ? { style: style.doneQuestion, tooltip: 'Mark question as unanswered', icon: 'cancel' }
      : { style: style.undoneQuestion, tooltip: 'Mark question as answered', icon: 'done'}
    return (
      <Card style={style.container} containerStyle={doneQuestion.style}>
        <CardHeader style={style.header}
          title={question.username}
          subtitle={votes}
          avatar={question.picture}>
            <div style={{float:'right'}}>
              <IconButton
                iconClassName="material-icons"
                onClick={this.handleVote}
                disabled={thumbUpDisabled}
                tooltip="Vote question">
                thumb_up
              </IconButton>
              <IconButton
                iconClassName="material-icons"
                onClick={this.handleDone}
                disabled={doneDisabled}
                tooltip={doneQuestion.tooltip}>
                {doneQuestion.icon}
              </IconButton>
            </div>
        </CardHeader>
        <CardText style={style.text}>
          {question.text}
        </CardText>
      </Card>
    )
  }
}

QuestionItem.propTypes = {
  question: PropTypes.object.isRequired,
  onThumbUp: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired,
  thumbUpDisabled: PropTypes.bool.isRequired,
  doneDisabled: PropTypes.bool.isRequired
}
