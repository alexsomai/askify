import React, { Component, PropTypes } from 'react'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'

export default class QuestionTextInput extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {text: ''}
  }

  handleChange(event) {
    this.setState({text: event.target.value})
  }

  clearInput() {
    this.setState({text: ''})
  }

  handleSubmit() {
    const text = this.state.text.trim()
    if(!text) return

    fetch('/questions', {
      method: 'post',
      body: JSON.stringify({
        text: this.state.text,
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
          value={this.state.text}
          hintText="What do you think about ... ?"
          multiLine={true}
          onChange={this.handleChange} />
        <br />
        <RaisedButton
          onClick={this.handleSubmit}
          label="Submit"/>
      </div>
    )
  }
}
