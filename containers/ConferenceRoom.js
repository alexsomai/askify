import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import QuestionTextInput from "../components/QuestionTextInput"
import MainSection from "../components/MainSection"
import * as QuestionActions from '../actions'
import Rx from 'rx'
import io from 'socket.io-client'

let subscribtion

class ConferenceRoom extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.subscribeToEvents()
  }

  subscribeToEvents() {
    const socket = io()

    const createStream$ = Rx.Observable
      .fromEvent(socket, 'create')
      .filter(item => item.room === this.props.inputValue)
    const updateStream$ = Rx.Observable
      .fromEvent(socket, 'update')
      .filter(item => item.room === this.props.inputValue)

    const { actions, questions } = this.props
    const action$ = Rx.Observable.merge(
      createStream$.map(actions.addQuestion),
      updateStream$.map(actions.voteQuestion)
    )
    subscribtion = action$.subscribe(questions.dispatch)
  }

  componentWillUnmount() {
    subscribtion.dispose()
  }

  render() {
    const { questions, actions, inputValue } = this.props
    return (
      <div>
        <MainSection questions={questions} actions={actions} />
        <QuestionTextInput room={inputValue} />
      </div>
    )
  }
}

ConferenceRoom.propTypes = {
  questions: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  inputValue: PropTypes.string.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    questions: state.questions,
    inputValue: ownProps.location.pathname
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
