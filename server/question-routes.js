const express = require('express')
const express_jwt = require('express-jwt')
const config = require('./config')
const jwt = require('jsonwebtoken')
const jwt_decode = require('jwt-decode')

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
  const user = jwt_decode(id_token)
  const room = req.body.room
  const text = req.body.text

  db.insertQuestion(room, text, user.id, () => {
    res.sendStatus(201)
  })
})

app.put('/question/:room/:id', (req, res) => {
  const id_token = req.headers['authorization'].split(' ')[1]
  const user = jwt_decode(id_token)
  const room = req.params.room
  const question_id = req.params.id

  db.voteQuestion(question_id, req.body.votes, user.id, (result) => {
    if (result.errors) {
      res.status(400).send({ message: result.first_error })
    } else {
      res.sendStatus(200)
    }
  })
})
