'use strict'

const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('./webpack.config')

const app = require('express')()
const bodyParser = require('body-parser')
const port = 3000

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

const http = require('http').Server(app)
const io = require('socket.io')(http)

const questions = []

app.post('/questions', function (req, res, next) {
  let question = req.body
  questions.push(questions)
  console.log(questions)
  io.emit('questions', question)
  res.sendStatus(201)
})

app.use(function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
  }
})


// Websocket ===================================================================
io.on('connection', function(socket){
  console.log('connected lol')
})

io.on('questions', function(msg){
  console.log('eeee');
  });
