'use strict'
const express = require('express')
const fetch = require('node-fetch')
const app = express()
const server = require('http').Server(app)
const bodyParser = require('body-parser')
const cors = require('cors')
const port = 3001

const db = require('./db')

// set up the RethinkDB database
db.setup()

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors())

app.get('/questions/:room', (req, res, next) => {
  const room = req.params.room
  db.findQuestions(room, questions => {
    res.json({ [room]: questions })
  })
})

app.post('/questions', (req, res, next) => {
  const id_token = req.headers['authorization'].split(' ')[1]
  const room = req.body.room
  const text = req.body.text

  /* TODO - retrieve user details based on id_token */
  const question = {
    text: text, room: room, votes: 0,
    user_id: '22',
    picture: '',
    name: 'profile.name',
    email: 'profile.email',
    nickname: 'profile.nickname',
    voted_by: []
  }
  db.insertQuestion(question, () => {
    res.sendStatus(201)
  })
})

app.put('/question/:room/:id', (req, res, next) => {
  const id_token = req.headers['authorization'].split(' ')[1]
  const room = req.params.room
  const id = req.params.id

  /* TODO - retrieve user details based on id_token */
  db.voteQuestion(id, req.body.votes, '22', () => {
    res.sendStatus(200)
  })
})

const io = require('socket.io')(server)
io.on('connection', socket => {
  console.log(`User connected. Socket id ${socket.id}`)

  socket.on('disconnect', () => {
    console.log(`User diconnected. Socket id ${socket.id}`)
  })
})

db.listenForAddQuestion(row => io.emit('question:create', row.new_val))
db.listenForEditQuestion(row => io.emit('question:update', row.new_val))

app.use(require('./user-routes'))

server.listen(port)

console.info(`==> 🌎  Server Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
