import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as QuestionActions from '../actions'
import { subscribe, unsubscribe } from '../middleware/socket-util'

import QuestionTextInput from '../components/QuestionTextInput'
import MainSection from '../components/MainSection'
import HomeButton from '../components/HomeButton'

function loadData(props) {
  const { actions, room } = props
  actions.loadQuestions(room)
}

class ConferenceRoom extends Component {
  constructor(props) {
    super(props)
    this.submitQuestion = this.submitQuestion.bind(this)
    this.voteQuestion = this.voteQuestion.bind(this)
  }

  componentWillMount() {
    loadData(this.props)
  }

  componentDidMount() {
    subscribe(this.props)
  }

  componentWillUnmount() {
    unsubscribe()
  }

  submitQuestion(text) {
    if(!text) {
      return
    }

    const { room } = this.props
    fetch('/questions', {
      method: 'post',
      body: JSON.stringify({ text, room }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  voteQuestion(question) {
    const { room } = this.props
    const { id, votes } = question

    fetch(`/question/${room}/${id}`, {
      method: 'put',
      body: JSON.stringify({
        votes: votes + 1
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  render() {
    const { questions, actions, room, status } = this.props
    return (
      <div>
        <HomeButton />
        <MainSection
          questions={questions[room]}
          isFetching={status.isFetching}
          onVoteQuestion={this.voteQuestion}
          loadingLabel={`Loading questions for '${room}' conference room...`}
          emptyRoomLabel={`Conference room '${room}' has no questions yet`} />
        <QuestionTextInput onSubmit={this.submitQuestion} />
      </div>
    )
  }
}

ConferenceRoom.propTypes = {
  questions: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  room: PropTypes.string.isRequired
}

ConferenceRoom.defaultProps = {
  status: { isFetching: false }
}

function mapStateToProps(state, ownProps) {
  const room = ownProps.location.pathname.replace('/', '')
  return {
    questions: state.questions,
    status: state.status.questions[room],
    room: room
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(QuestionActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConferenceRoom)
