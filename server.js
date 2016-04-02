'use strict'
const app = require('express')()
const server = require('http').Server(app)
const bodyParser = require('body-parser')
const port = 3000

const questions = []

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const config = require('./webpack.config')
const compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

app.post('/questions', (req, res, next) => {
  let question = req.body
  questions.push(questions)
  io.emit('questions', question)
  res.sendStatus(201)
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
