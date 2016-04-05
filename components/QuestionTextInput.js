import React, { Component, PropTypes } from 'react'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'

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
    if(!text) {
      return
    }

    fetch('/questions', {
      method: 'post',
      body: JSON.stringify({
        text: this.state.text,
        room: this.props.room
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if (response.status === 201) {
        this.clearInput()
      } else {
        console.error('Oops, something went wrong!')
      }
    })
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
          onChange={this.handleChange} />
        <br/>
        <RaisedButton
          onClick={this.handleSubmit}
          primary={true}
          label="Submit"/>
      </div>
    )
  }
}

QuestionTextInput.propTypes = {
  room: PropTypes.string.isRequired
}
