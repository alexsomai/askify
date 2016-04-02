import React, { Component, PropTypes } from 'react'
// import { Observable } from 'rxjs/Observable'
// import RX from 'rx'
// import io from 'socket.io-client';
// import { io } from 'socket.io'

// var socket = io('ws://localhost:3000');

// var dataStream = RX.Observable.fromEvent(socket, 'data');

// dataStream.subscribe(function(payload) {
  // console.log(payload);
// });
const io = require('socket.io-client')

export default class QuestionItem extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.listenNotifications()
  }

  listenNotifications() {
    console.log('HEREEEEEE');
    let socket = io()
    // socket.on('connect', function(){});


    console.log(socket);
    socket.emit('questions', 'blabla');
    socket.on('questions', (newQuestion) => {
      console.log('message: ' + newQuestion)
    })
  }

  render() {
    return (
      <div>
        <p>This will be the question?</p>
      </div>
    )
  }
}
