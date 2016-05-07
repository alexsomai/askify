import React, { Component, PropTypes } from 'react'

import { Card, CardHeader, CardText } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'

const style = {
  margin: '12px auto',
  width: '40vw',
  header: {
    padding: '16px 0 0 16px'
  },
  text: {
    padding: 0
  }
}

export default class QuestionItem extends Component {
  constructor(props) {
    super(props)
    this.handleVote = this.handleVote.bind(this)
  }

  handleVote() {
    this.props.onThumbUp(this.props.question)
  }

  render() {
    const { question, thumbUpDisabled } = this.props
    const votes = `${question.votes} votes`
    return (
      <Card style={style}>
        <CardHeader style={style.header}
          title={question.username}
          subtitle={votes}
          avatar={question.picture} />
        <CardText style={style.text}>
          <IconButton
            iconClassName="material-icons"
            onClick={this.handleVote}
            disabled={thumbUpDisabled}>
            thumb_up
          </IconButton>
          {question.text}
        </CardText>
      </Card>
    )
  }
}

QuestionItem.propTypes = {
  question: PropTypes.object.isRequired,
  onThumbUp: PropTypes.func.isRequired,
  thumbUpDisabled: PropTypes.bool.isRequired
}
