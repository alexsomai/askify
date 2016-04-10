import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import QuestionTextInput from "../components/QuestionTextInput"
import MainSection from "../components/MainSection"
import * as QuestionActions from '../actions'
import Rx from 'rx'
import io from 'socket.io-client'
import { Link } from 'react-router'

let subscribtion

function loadData(props) {
  const { actions, room } = props
  actions.loadQuestions(room)
}

class ConferenceRoom extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    loadData(this.props)
  }

  componentDidMount() {
    this.subscribeToEvents()
  }

  componentWillUnmount() {
    subscribtion.dispose()
  }

  render() {
    const { questions, actions, room, status } = this.props

    return (
      <div>
        <Link to="/">Home</Link>
        <MainSection
          questions={questions[room]}
          room={room}
          isFetching={status.isFetching} />
        <QuestionTextInput room={room} />
      </div>
    )
  }

  subscribeToEvents() {
    const socket = io()
    const { questions, actions, room } = this.props

    const createStream$ = Rx.Observable
      .fromEvent(socket, 'create')
      .filter(item => item.room === room)
    const updateStream$ = Rx.Observable
      .fromEvent(socket, 'update')
      .filter(item => item.room === room)

    const action$ = Rx.Observable.merge(
      createStream$.map(actions.addQuestion),
      updateStream$.map(actions.voteQuestion)
    )
    subscribtion = action$.subscribe(questions.dispatch)
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
  const room = ownProps.location.pathname
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
