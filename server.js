'use strict'
const express = require('express')
const app = express()
const server = require('http').Server(app)
const bodyParser = require('body-parser')
const port = 3000

const r = require('rethinkdb')
let connection = null

r.connect( {host: 'localhost', port: 28015}, function(err, conn) {
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
                  { text: 'What is your favourite programming language?', room: 'conference-room-1', votes: 1 },
                  { text: 'Why do you like Java?', room: 'conference-room-1', votes: 2 }
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

const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const config = require('./webpack.config')
const compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

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
  const room = req.body.room
  const text = req.body.text

  r.table('questions').insert({ text: text, room: room, votes: 0 })
  .run(connection, function(err, result) {
      if (err) throw err
      console.log(JSON.stringify(result, null, 2))
      res.sendStatus(201)
  })
})

app.put('/question/:room/:id', (req, res, next) => {
  const room = req.params.room
  const id = req.params.id

  r.table('questions').get(id).update({votes: req.body.votes})
    .run(connection, function(err, result) {
      if (err) throw err
      console.log(JSON.stringify(result, null, 2))
      res.sendStatus(200)
    })
})

app.use(express.static(__dirname + '/public'))
app.use((req, res) => res.sendFile(__dirname + '/public/index.html'))

const io = require('socket.io')(server)
io.on('connection', socket => {
  console.log(`User connected. Socket id ${socket.id}`)

  socket.on('disconnect', () => {
    console.log(`User diconnected. Socket id ${socket.id}`)
  })
})

server.listen(port)

console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
