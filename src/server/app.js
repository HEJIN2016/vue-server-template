/*
 * @Author: hejin
 */
const path = require('path')
const express = require('express')
const cookieParser = require('cookie-parser')
const compression = require('compression')
const config = require('../../config/index.js')
const route = require('./route')

const app = express()

app.use(compression())
app.use(cookieParser())
app.use('/', express.static(path.resolve(__dirname, '../../dist/client'), { redirect: false }))

app.use('/', route)
app.use((req, res) => {
  res.sendFile(path.resolve(__dirname, '../../dist/client/index.html'))
})

app.listen(config.port, config.host, (error) => {
  if (error) {
    console.error(error)
  }
  console.log('%s: Node server started on %s:%d ...', new Date(), '0.0.0.0', config.port)
})
