import React, { Component, PropTypes } from 'react'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'

export default class QuestionTextInput extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  getInputValue() {
    return this.refs.input.getValue()
  }

  handleSubmit(e) {
    e.preventDefault()
    console.log(this.getInputValue())
    // const text = e.target.value.trim()
    // if (e.which === 13) {
      // console.log(`submiting ${text}`);
      // console.log('enter');
    //   this.props.onSave(text)
    //   if (this.props.newTodo) {
    //     this.setState({ text: '' })
    //   }
    // }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <TextField
            hintText="What do you think about ... ?"
            floatingLabelText="Post your question"
            multiLine={true}
            ref="input" />
          <br />
          <RaisedButton
            label="Submit"
            type="submit" />
        </form>
      </div>
    )
  }
}
