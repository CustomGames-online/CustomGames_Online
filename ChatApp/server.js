const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./message/message');
const { userJoin, getCurrentUser, userLeaves, users, userToRoom } = require('./message/user');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));

// Runs when client connects
io.on('connection', socket => {
    socket.on('joinRoom', ({ username, room }) => {
        socket.emit("initializeRoom", { "users": users[room] });
        const user = userJoin(socket.id, username, room);
        console.log(user);
        socket.join(userToRoom[socket.id]);
        socket.emit("message", formatMessage("","Welcome to ChatRoom"));
        io.in(userToRoom[socket.id]).emit("newUser", user);
        socket.to(userToRoom[socket.id]).emit("message", formatMessage(user.username, `${user.username} has joined the chat`));
    });

    socket.on('disconnect', () => {
        const user = getCurrentUser(socket.id, userToRoom[socket.id]);
        socket.to(userToRoom[socket.id]).emit("byeUser", user);
        socket.to(userToRoom[socket.id]).emit('message', formatMessage(user.username,`${user.username} has left the chat`));
        userLeaves(socket.id, userToRoom[socket.id]);
    });

    // Listen and emits the message to users
    socket.on('chatMessage', (msg) => {
        const user = getCurrentUser(socket.id, userToRoom[socket.id]);
        io.in(userToRoom[socket.id]).emit('message', formatMessage(user.username, msg));
    });
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));