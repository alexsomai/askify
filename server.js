'use strict'
const app = require('express')()
const server = require('http').Server(app)
const bodyParser = require('body-parser')
const port = 3000

var questions = []

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const config = require('./webpack.config')
const compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

var questionId = 0

app.post('/questions', (req, res, next) => {
  let question = req.body
  // TODO change id to string
  question.id = ++questionId
  question.votes = 0

  questions.push(question)
  io.emit('create', question)
  res.sendStatus(201)
})

app.put('/question/:id', (req, res, next) => {
  let question = req.body
  questions.map(item => {
    console.log(req.params.id);
    console.log(item);
    if (item.id == req.params.id) {
      console.log(question);
      console.log(item);
      item.votes = question.votes
      io.emit('update', item)
    }
  })
  res.sendStatus(200)
})

app.use((req, res) => {
  res.sendFile(__dirname + '/index.html')
})

server.listen(port, error => {
  if (error) {
    console.error(error)
  } else {
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
  }
})

const io = require('socket.io')(server)
io.on('connection', socket => {
  console.log('user connected')
})
