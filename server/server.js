'use strict'
const express = require('express')
const fetch = require('node-fetch')
const app = express()
const server = require('http').Server(app)
const bodyParser = require('body-parser')
const cors = require('cors')
const port = 3001

// set up the RethinkDB database
db.setup();

const r = require('rethinkdb')
let connection = null

r.connect({ host: 'localhost', port: 28015 }, function(err, conn) {
    if (err) throw err
    connection = conn

    r.db('test').tableDrop('questions').run(connection, function(err, resut) {
      if (err) throw err

      r.db('test').tableCreate('questions').run(connection, function(err, result) {
          if (err) throw err
          console.log(JSON.stringify(result, null, 2))

          r.table('questions').indexCreate('room').run(connection, function(err, result){
            if (err) throw err
            console.log(result)
          })

          r.table('questions').insert([
            {
              'email': 'alex_somai@yahoo.com',
              'name': 'alex_somai@yahoo.com',
              'nickname': 'alex_somai',
              'picture': 'https://s.gravatar.com/avatar/b6dffbc5adc820afa69a449879948e5d?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fal.png',
              'room': 'conference-room-1',
              'text': 'What is your favourite programming language?',
              'user_id': 'auth0|570d391f3f062e8f16a7aa7a',
              'votes': 0,
              'voted_by': []
            },
            {
              'email': 'alex_somai@yahoo.com',
              'name': 'alex_somai@yahoo.com',
              'nickname': 'alex_somai',
              'picture': 'https://s.gravatar.com/avatar/b6dffbc5adc820afa69a449879948e5d?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fal.png',
              'room': 'conference-room-1',
              'text': 'Why do you like Java?',
              'user_id': 'auth0|570d391f3f062e8f16a7aa7a',
              'votes': 2,
              'voted_by': []
            }
          ]).run(connection, function(err, result) {
              if (err) throw err
              console.log(JSON.stringify(result, null, 2))
          })

          r.table('questions').changes().filter(r.row('old_val').eq(null))
            .run(connection, function(err, cursor) {
              if (err) throw err
              cursor.each(function(err, row) {
                  if (err) throw err
                  console.log(JSON.stringify(row, null, 2))

                  io.emit('question:create', row.new_val)
              })
          })

          r.table('questions').changes()
            .run(connection, function(err, cursor) {
              if (err) throw err
              cursor.each(function(err, row) {
                  if (err) throw err
                  console.log(JSON.stringify(row, null, 2))

                  io.emit('question:update', row.new_val)
              })
          })
      })
    })
})

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors())

app.get('/questions/:room', (req, res, next) => {
  const room = req.params.room

  r.table('questions').filter(r.row('room').eq(room))
    .run(connection, function(err, cursor) {
      if (err) throw err
      cursor.toArray(function(err, result) {
          if (err) throw err
          console.log(JSON.stringify(result, null, 2))
          res.json({ [room]: result })
      })
  })
})

app.post('/questions', (req, res, next) => {
  const id_token = req.headers['authorization'].split(' ')[1]
  const room = req.body.room
  const text = req.body.text

  fetch('https://alexsomai.eu.auth0.com/tokeninfo', {
    method: 'post',
    body: JSON.stringify({ id_token }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(function(response) {
		return response.json()
	}).then(function(json) {
    const profile = json
    r.table('questions').insert({
      text: text, room: room, votes: 0,
      user_id: profile.user_id,
      picture: profile.picture,
      name: profile.name,
      email: profile.email,
      nickname: profile.nickname,
      voted_by: []
    })
    .run(connection, function(err, result) {
        if (err) throw err
        console.log(JSON.stringify(result, null, 2))
        res.sendStatus(201)
    })
	})
})

app.put('/question/:room/:id', (req, res, next) => {
  const id_token = req.headers['authorization'].split(' ')[1]
  const room = req.params.room
  const id = req.params.id

  fetch('https://alexsomai.eu.auth0.com/tokeninfo', {
    method: 'post',
    body: JSON.stringify({ id_token }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(function(response) {
		return response.json()
	}).then(function(json) {
    const profile = json
    r.table('questions').get(id)
      .update({
        votes: req.body.votes,
        voted_by: r.row('voted_by').append(profile.user_id)
      }).run(connection, function(err, result) {
        if (err) throw err
        console.log(JSON.stringify(result, null, 2))
        res.sendStatus(200)
    })
  })
})

const io = require('socket.io')(server)
io.on('connection', socket => {
  console.log(`User connected. Socket id ${socket.id}`)

  socket.on('disconnect', () => {
    console.log(`User diconnected. Socket id ${socket.id}`)
  })
})

app.use(require('./user-routes'));

server.listen(port)

console.info(`==> 🌎  Server Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
