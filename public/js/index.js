// const io = require('socket.io')

const socket = io()

socket.on('connect', () => {
  console.log('connected to server...')

})

socket.on('disconnect', () => {
  console.log('connection lost...')
})
socket.on('newMessage', (data) => {
  console.log('new message...', data)
})