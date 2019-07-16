import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Done from '@material-ui/icons/Done';
import Cancel from '@material-ui/icons/Cancel';

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
    wordWrap: 'break-word',
    fontSize: 16
  },
  avatar: {
    backgroundColor: '#b8b8b8'
  }
};

export default class QuestionItem extends Component {
  constructor(props) {
    super(props);
    this.handleVote = this.handleVote.bind(this);
    this.handleDone = this.handleDone.bind(this)
  }

  handleVote() {
    this.props.onThumbUp(this.props.question)
  }

  handleDone() {
    this.props.onDone(this.props.question)
  }

  render() {
    const { question, thumbUpDisabled, doneDisabled } = this.props;
    const votes = `${question.votes} votes`;
    const doneQuestion = question.done
      ? { style: style.doneQuestion, tooltip: 'Mark question as unanswered', icon: <Cancel /> }
      : { style: style.undoneQuestion, tooltip: 'Mark question as answered', icon: <Done /> };

    return (
      <div style={doneQuestion.style}>
        <Card style={style.container}>
          <CardHeader
            avatar={<Avatar src={question.picture} style={style.avatar} />}
            style={style.header}
            title={question.username}
            subheader={votes}
            action={
              <div>
                <Tooltip title="Vote question">
                  <div style={{ float: 'left' }}>
                    <IconButton onClick={this.handleVote} disabled={thumbUpDisabled}>
                      <ThumbUp />
                    </IconButton>
                  </div>
                </Tooltip>
                <Tooltip title={doneQuestion.tooltip}>
                  <div style={{ float: 'left', marginRight: '25px' }}>
                    <IconButton onClick={this.handleDone} disabled={doneDisabled}>
                      {doneQuestion.icon}
                    </IconButton>
                  </div>
                </Tooltip>
              </div>
            }
          />
          <CardContent>
            <Typography style={style.text}>
              {question.text}
            </Typography>
          </CardContent>
        </Card>
      </div>
    )
  }
}

QuestionItem.propTypes = {
  question: PropTypes.object.isRequired,
  onThumbUp: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired,
  thumbUpDisabled: PropTypes.bool.isRequired,
  doneDisabled: PropTypes.bool.isRequired
};
