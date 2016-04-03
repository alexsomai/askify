import React, { Component, PropTypes } from 'react'

import Card from 'material-ui/lib/card/card'
import CardHeader from 'material-ui/lib/card/card-header'
import CardText from 'material-ui/lib/card/card-text'
import IconButton from 'material-ui/lib/icon-button'

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

  handleVote(){
    fetch('/question/' + this.props.question.id, {
      method: 'put',
      body: JSON.stringify({
        votes: this.props.question.votes + 1
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  render() {
    const { question } = this.props
    const votes = `${question.votes} votes`
    return (
      <Card style={style}>
        <CardHeader style={style.header}
          title="username"
          subtitle={votes}
          avatar="http://lorempixel.com/100/100/nature/" />
        <CardText style={style.text}>
          <IconButton
            iconClassName="material-icons"
            onClick={this.handleVote}>
            thumb_up
          </IconButton>
          {question.text}
        </CardText>
      </Card>
    )
  }
}

QuestionItem.propTypes = {
  question: PropTypes.object.isRequired
}
