const path = require('path')
const http = require('http')
const express = require('express')
const websockets = require('socket.io')

const { env } = require('../config/config')

const app = express()
const server = http.createServer(app)
const io = websockets(server)

app.use('/', express.static(path.join(__dirname, '../public')))

io.on('connection', (socket) => {
  console.log('client connected:')

  socket.on('disconnect', () => {
    console.log('Client disconnected...')
  })
})

server.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT} in ${env} mode...`))