#!/usr/bin/env node
import express from 'express'
import http from 'node:http'
import { Server } from 'socket.io'
import rrpf from 'rrpf'
import ip from 'ip'

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.get('/', (req, res) => {
  res.sendFile(rrpf('./index.html'))
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

let port = 3000
server.listen(port, () => { console.log(`server is running on http://${ip.address()}:${port}` )})

server.on('error', e => {
  if (e.code === 'EADDRINUSE') {
    port += 1
    server.listen(port)
  }
})
