const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  const httpServer = createServer(server);
  const io = new Server(httpServer);

  io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('joinRoom', (room) => {
      socket.join(room);
      console.log(`User joined room: ${room}`);
    });

    socket.on('message', ({ room, message }) => {
      io.to(room).emit('message', message);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  httpServer.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
