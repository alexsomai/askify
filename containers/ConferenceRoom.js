import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import QuestionTextInput from "../components/QuestionTextInput";
import QuestionItem from "../components/QuestionItem";

class ConferenceRoom extends Component {

  render() {
    return (
      <div>
        <h1>I have no ideea what I am doing</h1>
        <QuestionTextInput />
        <QuestionItem />
      </div>
    )
  }
}

export default ConferenceRoom
