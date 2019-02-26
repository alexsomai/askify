import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

const style = {
  position: 'fixed',
  bottom: 0,
  padding: 23
}

export default class QuestionTextInput extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = { text: '' }
  }

  handleChange(event) {
    this.setState({ text: event.target.value })
  }

  getInputValue() {
    return this.state.text.trim()
  }

  clearInput() {
    this.setState({ text: '' })
  }

  handleSubmit() {
    this.props.onSubmit(this.getInputValue())
    this.clearInput()
  }

  render() {
    return (
      <div style={style}>
        <TextField
          id="question-text-field"
          value={this.state.text}
          hintText="What do you think about ... ?"
          floatingLabelText="Question"
          multiLine={true}
          disabled={this.props.isSubmitting}
          onChange={this.handleChange} />
        <br/>
        <RaisedButton
          onClick={this.handleSubmit}
          primary={true}
          disabled={this.props.isSubmitting}
          label="Submit"/>
      </div>
    )
  }
}

QuestionTextInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool
}
