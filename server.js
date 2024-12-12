/**
 * Main server file for the bingo chat app.
 * 
 * This file sets up the express server and socket.io
 * and defines the endpoints for the app.
 * 
 * @author Andrew Hogan
 */

const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

/**
 * Set of active rooms. 
 * 
 * Each room is identified by a unique string.
 */
const activeRooms = new Set();

/**
 * Maps room names to the users in the room.
 * 
 * Each room is identified by a unique string and the value is an array of usernames.
 */
const roomUsers = {};

/**
 * Maps room names to the type of the room. 
 * 
 * Each room is identified by a unique string and the value is either 'public' or 'private'.
 */
const roomTypes = {};

app.prepare().then(() => {
    const server = express();
    const httpServer = createServer(server);
    const io = new Server(httpServer);

    io.on('connection', (socket) => {
        console.log('a user connected');

        // Listen for and handle socket events such as room creation, joining, and leaving

        socket.on('createRoom', ({ room, type }) => {
            socket.join(room);
            activeRooms.add(room);
            roomUsers[room] = roomUsers[room] || [];
            roomTypes[room] = type;
            io.emit('activeRooms', Array.from(activeRooms).map(room => ({ room, type: roomTypes[room] })));
            console.log(`Room ${room} created as ${type}`);
        });

        socket.on('joinRoom', ({ room, username }) => {
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

        // Send a message to all clients in the room
        socket.on('message', ({ room, message }) => {
            io.to(room).emit('message', { username: socket.username, message });
        });

        // Send a message to all clients in the room that a game has ended
        socket.on('winnerMessage', (message) => {
            io.in(socket.rooms[1]).emit('winnerMessage', message);
        });

        // Send a message to all clients in the room that a game has ended
        socket.on('bingo', (winnerName) => {
          io.in(socket.rooms[1]).emit('gameEnded', winnerName);
        });

        // Send a message to all clients in the room that a game has ended
        // and the winner's name and winning values
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

        // When a client disconnects, remove them from the room and send an update to the other clients
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

    // Get a list of active rooms
    server.get('/api/rooms', (req, res) => {
        res.json({ rooms: Array.from(activeRooms).map(room => ({ room, type: roomTypes[room] })) });
    });

    // Redirect GET requests for /chat/:room to the chat page
    server.get('/chat/:room', (req, res) => {
        return app.render(req, res, '/chat/[room]', { room: req.params.room });
    });

    // Handle all other requests with Next.js
    server.all('*', (req, res) => {
        return handle(req, res);
    });

    // Start the server
    const PORT = process.env.PORT || 3000;
    httpServer.listen(PORT, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${PORT}`);
    });
});

