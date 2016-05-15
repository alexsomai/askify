import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as QuestionActions from '../actions'
import { subscribe } from '../middleware/socket-util'
import { API_ROOT } from '../middleware/api'

import QuestionTextInput from '../components/QuestionTextInput'
import MainSection from '../components/MainSection'
import BackToTop from '../components/BackToTop'

function loadData(props) {
  const { actions, room } = props
  actions.loadQuestions(room)
}

class ConferenceRoom extends Component {
  constructor(props) {
    super(props)
    this.submitQuestion = this.submitQuestion.bind(this)
    this.voteQuestion = this.voteQuestion.bind(this)
    this.doneQuestion = this.doneQuestion.bind(this)
  }

  componentWillMount() {
    loadData(this.props)
  }

  componentDidMount() {
    subscribe(this.props)
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
    const { id, votes } = question

    fetch(`${API_ROOT}/question/${id}`, {
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

  doneQuestion(question) {
    fetch(`${API_ROOT}/question/${question.id}`, {
      method: 'put',
      body: JSON.stringify({
        done: !question.done
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
        <MainSection
          questions={questions[room]}
          userinfo={userinfo}
          isFetching={status.isFetching}
          errorMessage={status.errorMessage}
          onVoteQuestion={this.voteQuestion}
          onDoneQuestion={this.doneQuestion}
          loadingLabel={`Loading questions for '${room}' conference room...`}
          emptyRoomLabel={`Conference room '${room}' has no questions yet`} />
        <QuestionTextInput onSubmit={this.submitQuestion} />
        <BackToTop />
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
