'use strict'
const express = require('express')
const fetch = require('node-fetch')
const app = express()
const server = require('http').Server(app)
const bodyParser = require('body-parser')
const cors = require('cors')
const port = 3001

const jwt = require('jsonwebtoken')

const config = require('./config')
const io = require('socket.io')(server)
const socketioJwt = require('socketio-jwt')

const db = require('./db')

// set up the RethinkDB database
db.setup(() => {
  db.listenForAddQuestion(item =>
    io.on('authenticated', () => {}).emit('question:create', item))
  db.listenForUpdateQuestion((oldItem, newItem) => {
    if (oldItem.votes !== newItem.votes) {
      io.on('authenticated', () => {}).emit('question:vote', newItem)
    }
    if (oldItem.done !== newItem.done) {
      io.on('authenticated', () => {}).emit('question:done', newItem)
    }
  })
})

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors())

app.use(require('./user-routes'))
app.use(require('./question-routes'))

io.on('connection', socketioJwt.authorize({
		secret: config.secret,
		timeout: 15000 // 15 seconds to send the authentication message
	}))
  .on('authenticated', socket => {
    console.log(`User connected & authenticated: ${JSON.stringify(socket.decoded_token)}. Socket id: ${socket.id}`)

    socket.on('disconnect', () => {
      console.log(`User diconnected. Socket id ${socket.id}`)
    })
	})

server.listen(port)

console.info(`==> 🌎  Server Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
