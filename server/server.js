'use strict'
const express = require('express')
const fetch = require('node-fetch')
const app = express()
const server = require('http').Server(app)
const bodyParser = require('body-parser')
const cors = require('cors')
const port = 3001

const jwt = require('jsonwebtoken')

const db = require('./db')

// set up the RethinkDB database
db.setup(() => {
  db.listenForAddQuestion(item => io.emit('question:create', item))
  db.listenForEditQuestion(item => io.emit('question:update', item))
})

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors())

app.use(require('./user-routes'))
app.use(require('./question-routes'))

const io = require('socket.io')(server)
io.on('connection', socket => {
  console.log(`User connected. Socket id ${socket.id}`)

  socket.on('disconnect', () => {
    console.log(`User diconnected. Socket id ${socket.id}`)
  })
})

server.listen(port)

console.info(`==> 🌎  Server Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
