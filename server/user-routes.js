const express = require('express')
const _ = require('lodash')
const config = require('./config')
const jwt = require('jsonwebtoken')

const app = module.exports = express.Router()
const db = require('./db')

function createToken(user) {
  return jwt.sign(_.omit(user, 'password'), config.secret, { expiresIn: 60*60*5 })
}

app.get('/users', (req, res) =>  {
  db.findUsers(users => res.json(users))
})

app.post('/users', (req, res) =>  {
  const username = req.body.username
  const password = req.body.password

  if (!username || !password) {
    return res.status(400).send({ message: 'You must send the username and the password' })
  }

  db.findUserByUsername(username, user => {
    if (!_.isEmpty(user)) {
      console.log(user);
      return res.status(400).send({ message: 'A user with that username already exists' })
    }

    db.createUser(username, password, user => {
      console.log("USER");
      console.log(user);
      res.status(201).send({ id_token: createToken(user) })
    })
  })
})

app.post('/sessions/create', (req, res) =>  {
  const username = req.body.username
  const password = req.body.password

  if (!username || !password) {
    return res.status(400).send({ message: 'You must send the username and the password' })
  }

  db.findUserByUsername(username, user => {
    if (!user) {
      return res.status(401).send({ message: 'The username or password don\'t match' })
    }
    if (user.password !== password) {
        return res.status(401).send({ message: 'The username or password don\'t match' })
    }
    res.status(201).send({ id_token: createToken(user) })
  })
})
