import React, { Component, PropTypes } from 'react'

export default class QuestionTextInput extends Component {

  constructor(props, context) {
    super(props, context)
  }

  handleSubmit(input) {
    console.log(input);
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
    let input

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        console.log(input.value)
        input.value = ''
      }}>
        <input ref={node => {
          input = node
        }} />
        <button type="submit">
          Add Todo
        </button>
      </form>
    </div>
  )
  }
}
