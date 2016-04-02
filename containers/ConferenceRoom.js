import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import QuestionTextInput from "../components/QuestionTextInput"
import MainSection from "../components/MainSection"
import * as QuestionActions from '../actions'
import Rx from 'rx'
import io from 'socket.io-client'

import getMuiTheme from 'material-ui/lib/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()

const styles = {
  container: {
    textAlign: 'center'
  }
}

class ConferenceRoom extends Component {
  componentDidMount() {
    this.subscribeToWebSocketEvents()
  }

  subscribeToWebSocketEvents(){
    const socket = io()
    const createStream$ = Rx.Observable.fromEvent(socket, 'create')
    const updateStream$ = Rx.Observable.fromEvent(socket, 'update')
    const { actions, questions } = this.props

    const action$ = Rx.Observable.merge(
        createStream$.map(actions.addQuestion),
        updateStream$.map(actions.voteQuestion)
    )

    action$.subscribe(questions.dispatch)
  }

  render() {
    const { questions, actions } = this.props
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div style={styles.container}>
          <h1>I do have a bit of ideea about what I'm doing</h1>
          <MainSection questions={questions} actions={actions} />
          <QuestionTextInput />
        </div>
      </MuiThemeProvider>
    )
  }
}

ConferenceRoom.propTypes = {
  questions: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    questions: state.questions
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
