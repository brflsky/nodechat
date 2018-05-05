const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const { Users } = require('./utils/users')

const { env } = require('../config/config')
const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
const users = new Users()

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('join', (params, callback) => {
    console.log(params)
    if (params.name.trim() && params.room.trim()) {
      callback()
      socket.join(params.room)

      users.removeUser(socket.id)
      users.addUser(socket.id, params.name.trim(), params.room.trim())
      io.to(params.room.trim()).emit('updateUserList', users.getUsers(params.room))
      //socket.emit('userID', socket.id)
      socket.emit('userID', {
        message: generateMessage('Admin', `${params.name}! Welcome to the '${params.room}'`),
        userID: socket.id
      });
      socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin',  `${params.name} joind the "${params.room}"`));
    } else {
      callback('invalid data')
    }
  })


  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    const user = users.getUser(message.userID)
    io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
    const user = users.removeUser(socket.id)
    if (user) {
      socket.broadcast.to(user.room).emit('newMessage', generateMessage('Admin',  `${user.name} left "${user.room}"`));
      io.to(user.room).emit('updateUserList', users.getUsers(user.room))
    }
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port} in ***** ${env} mode ***** ....`);
});
