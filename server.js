'use strict'
const express = require('express')
const app = express()
const server = require('http').Server(app)
const bodyParser = require('body-parser')
const port = 3000

let questions = {}

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const config = require('./webpack.config')
const compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

let questionId = 0

app.get('/questions/:room', (req, res, next) => {
  let response = {}
  const room = `/${req.params.room}`
  if(questions[room] === undefined){
    questions[room] = []
  }
  console.log(questions)
  res.json({[room]: questions[room]})
})

app.post('/questions', (req, res, next) => {
  const room = req.body.room
  const text = req.body.text

  const id = '' + ++questionId
  const newQuestion = {
    id: id,
    text: text,
    votes: 0
  }
  questions[room].push(newQuestion)

  const response = newQuestion
  response.room = room
  io.emit('create', response)

  res.status(201)
  res.json(response)
})

app.put('/question/:room/:id', (req, res, next) => {
  const room = `/${req.params.room}`
  let updatedQuestion = {}

  questions[room]
    .filter(item => item.id === req.params.id)
    .map(item => {
        Object.assign(item, req.body)

        updatedQuestion = item
        updatedQuestion.room = room
    })

  io.emit('update', updatedQuestion)
  res.json(updatedQuestion)
})

app.use(express.static(__dirname + '/public'));
app.use((req, res) => res.sendFile(__dirname + '/public/index.html'))

const io = require('socket.io')(server)
io.on('connection', socket => console.log('user connected'))

server.listen(port)

console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
