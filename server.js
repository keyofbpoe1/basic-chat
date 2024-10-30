const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const activeRooms = new Set();
const roomUsers = {};
const roomTypes = {}; // To store room types (public/private)

app.prepare().then(() => {
    const server = express();
    const httpServer = createServer(server);
    const io = new Server(httpServer);

    io.on('connection', (socket) => {
        console.log('a user connected');

        socket.on('createRoom', ({ room, type }) => {
            socket.join(room);
            activeRooms.add(room);
            roomUsers[room] = roomUsers[room] || [];
            roomTypes[room] = type;
            io.emit('activeRooms', Array.from(activeRooms).map(room => ({ room, type: roomTypes[room] })));
            console.log(`Room ${room} created as ${type}`);
        });

        socket.on('joinRoom', ({ room, username }) => {
            // if (roomTypes[room] === 'private' && !roomUsers[room].includes(username)) {
            //     socket.emit('error', 'You do not have access to this private room.');
            //     return;
            // }
            socket.join(room);
            socket.username = username;
            roomUsers[room] = roomUsers[room] || [];
            roomUsers[room].push(username);
            io.to(room).emit('roomData', { room, users: roomUsers[room] });
            console.log(`${username} joined room ${room}`);
        });

        socket.on('leaveRoom', ({ room, username }) => {
            socket.leave(room);
            if (roomUsers[room]) {
                roomUsers[room] = roomUsers[room].filter(user => user !== username);
                if (roomUsers[room].length === 0) {
                    delete roomUsers[room];
                    delete roomTypes[room];
                    activeRooms.delete(room);
                    io.emit('activeRooms', Array.from(activeRooms).map(room => ({ room, type: roomTypes[room] })));
                    console.log(`Room ${room} closed`);
                } else {
                    io.to(room).emit('roomData', { room, users: roomUsers[room] });
                }
            }
            console.log(`${username} left room ${room}`);
        });

        socket.on('message', ({ room, message }) => {
            io.to(room).emit('message', { username: socket.username, message });
        });

        socket.on('winnerMessage', (message) => {
            io.in(socket.rooms[1]).emit('winnerMessage', message);
        });
    
        socket.on('bingo', (winnerName) => {
          io.in(socket.rooms[1]).emit('gameEnded', winnerName);
        });

        socket.on('winGame', (data) => {
          const { username, winningValues, room } = data;
          console.log(`Received winGame event from room ${room}`);
          const socketsInRoom = io.sockets.adapter.rooms.get(room);
          if (!socketsInRoom) {
            console.log(`No sockets found in room ${room}, not emitting gameEnded event`);
            return;
          }
          const socketsInRoomSet = new Set(socketsInRoom);
          console.log(`Found ${socketsInRoomSet.size} sockets in room ${room}`);
          if (socketsInRoomSet.size > 0) {
            io.to(room).emit('gameEnded', { winnerName: username, winningValues });
            console.log(`Emitted gameEnded event to room ${room}`);
          } else {
            console.log(`No sockets found in room ${room}, not emitting gameEnded event`);
          }
        });

        // socket.on('winGame', (data) => {
        //   const { username, winningValues, room } = data;
        //   console.log('Win game data:', data);
        //   io.to(room).emit('gameEnded', { winnerName: username, winningValues });
        // });

        // socket.on('winGame', (data) => {            
        //   const { username, winningValues, room } = data;
        //   console.log('Win game data:', data);          
          
        //   io.in(socket.rooms[1]).emit('gameEnded', { winnerName: username, winningValues });
        //   //io.in(socket.rooms[room]).emit('winnerMessage', `${username} has won the game!`);
        // });
    
        // socket.on('winGame', (data) => {
        //   const { username, winningValues } = data;
        //   io.in(socket.rooms[1]).emit('gameEnded', { winnerName: username, winningValues });
        //   io.in(socket.rooms[1]).emit('winnerAnnouncement', `${username} has won the game!`);
        // });

        // socket.on('winGame', (data) => {
        //   const { username, winningValues } = data;
        //   console.log('Win game data:', data);
        //   io.in(socket.rooms[1]).emit('gameEnded', { winnerName: username, winningValues });
        //   io.in(socket.rooms[1]).emit('winnerAnnouncement', `${username} has won the game!`);
        // });

        socket.on('disconnect', () => {
            for (const room of socket.rooms) {
                if (room !== socket.id) {
                    const username = socket.username;
                    if (roomUsers[room]) {
                        roomUsers[room] = roomUsers[room].filter(user => user !== username);
                        if (roomUsers[room].length === 0) {
                            delete roomUsers[room];
                            delete roomTypes[room];
                            activeRooms.delete(room);
                            io.emit('activeRooms', Array.from(activeRooms).map(room => ({ room, type: roomTypes[room] })));
                            console.log(`Room ${room} closed`);
                        } else {
                            io.to(room).emit('roomData', { room, users: roomUsers[room] });
                        }
                    }
                }
            }
            console.log('user disconnected');
        });
    });

    server.get('/api/rooms', (req, res) => {
        res.json({ rooms: Array.from(activeRooms).map(room => ({ room, type: roomTypes[room] })) });
    });

    server.get('/chat/:room', (req, res) => {
        return app.render(req, res, '/chat/[room]', { room: req.params.room });
    });

    server.all('*', (req, res) => {
        return handle(req, res);
    });

    const PORT = process.env.PORT || 3000;
    httpServer.listen(PORT, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${PORT}`);
    });
});
