'use strict'
const express = require('express')
const app = express()
const server = require('http').Server(app)
const bodyParser = require('body-parser')
const port = 3000

let questions = []

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

app.get('/questions', (req, res, next) => {
  res.json(questions)
})

app.post('/questions', (req, res, next) => {
  let question = req.body
  question.id = '' + ++questionId
  question.votes = 0

  questions.push(question)
  io.emit('create', question)
  res.sendStatus(201)
})

app.put('/question/:id', (req, res, next) => {
  let question = req.body
  questions.map(item => {
    if (item.id === req.params.id) {
      item.votes = question.votes
      io.emit('update', item)
    }
  })
  res.sendStatus(200)
})

app.use(express.static(__dirname + '/public'));
app.use((req, res) => res.sendFile(__dirname + '/public/index.html'))

const io = require('socket.io')(server)
io.on('connection', socket => console.log('user connected'))

server.listen(port)

console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
