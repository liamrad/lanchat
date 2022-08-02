const express = require('express')
const http = require('http')
const { resolve } = require('path')
const { Server } = require('socket.io')


const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.get('/', (req, res) => {
  // res.send('<h1>Hi</h1>')
  res.sendFile(resolve(__dirname, './index.html'))
})

io.on('connection', (socket) => {
  console.log(socket.id)
  console.log('a user connected')
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
  socket.on('chat message', (msg) => {
    console.log('message: '+ msg)
    io.emit('chat message', msg)
  })
  // socket.broadcast.emit('hi')
})

server.listen(3000, () => { console.log('server is running on 3000' )})