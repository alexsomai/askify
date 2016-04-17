const express = require('express')
const express_jwt = require('express-jwt')
const config = require('./config')
const jwt = require('jsonwebtoken')

const app = module.exports = express.Router()
const db = require('./db')

const jwtCheck = express_jwt({ secret: config.secret })

app.use('/questions', jwtCheck)

app.get('/questions/:room', (req, res) => {
  const room = req.params.room
  db.findQuestions(room, questions => {
    res.json({ [room]: questions })
  })
})

app.post('/questions', (req, res) => {
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

app.put('/question/:room/:id', (req, res) => {
  const id_token = req.headers['authorization'].split(' ')[1]
  const room = req.params.room
  const id = req.params.id

  /* TODO - retrieve user details based on id_token */
  db.voteQuestion(id, req.body.votes, '22', () => {
    res.sendStatus(200)
  })
})
