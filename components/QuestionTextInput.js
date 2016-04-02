import React, { Component, PropTypes } from 'react'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'

export default class QuestionTextInput extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.state = {value: ''}
  }

  handleInputChange(event) {
    this.setState({value: event.target.value})
  }

  clearInput() {
    this.setState({value: ''})
  }

  handleSubmit() {
    fetch('/questions', {
      method: 'post',
      body: JSON.stringify({
        question: this.state.value,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if (response.status === 201) {
        this.clearInput()
      } else {
        alert('Oops, something went wrong!')
      }
    })
  }

  render() {
    return (
      <div>
        <TextField
          value={this.state.value}
          hintText="What do you think about ... ?"
          floatingLabelText="Post your question"
          multiLine={true}
          onChange={this.handleInputChange} />
        <br />
        <RaisedButton
          onClick={this.handleSubmit}
          label="Submit"/>
      </div>
    )
  }
}
