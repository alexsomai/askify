import React, { Component, PropTypes } from 'react'

import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';

import FontIcon from 'material-ui/lib/font-icon';
import IconButton from 'material-ui/lib/icon-button';
import ActionHome from 'material-ui/lib/svg-icons/action/favorite';

const cardStyle = {
  margin: '0 auto',
  width: '40vw'
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
      <div>
      <Card style={cardStyle}>
        <CardHeader
          title="URL Avatar"
          subtitle={votes}
          avatar="http://lorempixel.com/100/100/nature/" />
        <CardText>
          <IconButton
            iconClassName="material-icons"
            onClick={this.handleVote}>
            thumb_up
          </IconButton>
          {question.text}
        </CardText>
      </Card>
      <br />
      </div>
    )
  }
}

QuestionItem.propTypes = {
  question: PropTypes.object.isRequired
}
