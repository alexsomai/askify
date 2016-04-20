import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as QuestionActions from '../actions'
import { subscribe, unsubscribe } from '../middleware/socket-util'
import { API_ROOT } from '../middleware/api'

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
    fetch(`${API_ROOT}/questions`, {
      method: 'post',
      body: JSON.stringify({ text, room }),
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('id_token')}`,
        'Content-Type': 'application/json'
      }
    })
  }

  voteQuestion(question) {
    const { room } = this.props
    const { id, votes } = question

    fetch(`${API_ROOT}/question/${room}/${id}`, {
      method: 'put',
      body: JSON.stringify({
        votes: votes + 1
      }),
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('id_token')}`,
        'Content-Type': 'application/json'
      }
    })
  }

  render() {
    const { questions, actions, userinfo, room, status } = this.props
    return (
      <div>
        <HomeButton />
        <MainSection
          questions={questions[room]}
          userinfo={userinfo}
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
    room: room,
    userinfo: state.userinfo.data
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
