import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const style = {
  position: 'fixed',
  bottom: 0,
  padding: 23,
  textField: {
    width: 250,
  },
};

export default class QuestionTextInput extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
    this.props.onSubmit(this.getInputValue());
    this.clearInput()
  }

  render() {
    return (
      <div style={style}>
        <TextField
          id="question-text-field"
          value={this.state.text}
          label="Question"
          placeholder="What do you think about ... ?"
          multiline
          disabled={this.props.isSubmitting}
          onChange={this.handleChange}
          style={style.textField}
          margin="normal"
        />
        <br />
        <Button variant="contained" color="primary" onClick={this.handleSubmit} disabled={this.props.isSubmitting}>
          Submit
        </Button>
      </div>
    )
  }
}

QuestionTextInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool
};
