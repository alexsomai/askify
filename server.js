'use strict'
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const express = require('express')
const app = express()
const port = 3000

const config = require('./webpack.config')
const compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname + '/public'))
app.use((req, res) => res.sendFile(__dirname + '/public/index.html'))

app.listen(port)

console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
