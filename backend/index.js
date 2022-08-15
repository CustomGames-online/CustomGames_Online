const express = require("express")();
const http = require("http").createServer(express);
const option = {
  cors: {
    origin: 'http://customgames.online/websocket', // backend address
    methods: ["GET", "POST"]
  }
};
const io = require("socket.io")(http, options);


import {
  userJoin,
  getCurrentUser,
  userLeaves,
  users,
  userToRoom
} from './users-chat.js';
import {
  saveGame,
  getGameQueue,
  getGameByID,
  updateGame,
  deleteGameByPlayer,
  deleteGameByID,
  deleteGameBySocket,
  houseKeeping,
} from './db.js';
import Game from './game.js';

import { Server } from 'socket.io';
import formatMessage from "./formatMessage.js";

export const Modes = {
  Unranked: 1,
  Private: 2
}

const env = 'development'
const app = express();
const server = http.createServer(app);
const io = new Server(
  server,
  /* options */ {
    cors: {
      origin: "*", // backend address
      methods: ['GET', 'POST']
    },
  }
);
// onConnection(socket) => socket.onMessage()

io.on('connection', (socket) => {
  socket.on('newGame',  async ({ gameType, user, mode, id }) => {
    houseKeeping()
    if (mode === Modes.Private) {
      if (!id) {
        console.log(`Player ${user} ID: ${socket.id} requested new private game of ${gameType}.`);
        const newGame = new Game(gameType, user);
        newGame.private = true
        newGame.player1ID = socket.id
        socket.join(newGame.room);
        saveGame(newGame);
        io.to(newGame.room).emit('game', newGame);

        return;
      }

      console.log(id)
      const game = getGameByID(id);
      if (!game) {
        return
      }

      socket.join(game.room);
      game.startGame(user);
      game.player2ID = socket.id
      io.to(game.room).emit('game', game);
      updateGame(game);
    }


    const game = getGameQueue(gameType); // get first game with pending equal to true and return it
    console.log(`Player ${user} ID: ${socket.id} requested new game of ${gameType}.`);
    if (!game) {
      console.log('No game available on queue.');
      const newGame = new Game(gameType, user);
      newGame.player1ID = socket.id
      socket.join(newGame.room);
      saveGame(newGame);

      return;
    }
    socket.join(game.room);
    game.startGame(user);
    game.player2ID = socket.id
    io.to(game.room).emit('game', game);
    updateGame(game);
  });
    
  socket.on('play', ({ gameObj, player, movement }) => {
    const game = getGameByID(gameObj.id);
    try{
      game.play(player, movement);
    }
    catch (error){
      console.error(error);
      }
      io.to(game.room).emit('game', game);
      updateGame(game);
  });

  socket.on('leave', (id) => {
    console.log(`User left the game id: ${id}`)
    const game = getGameByID(id);

    if (!game) {
      console.log('No game found!')
      return;
    }
    io.to(game.room).emit('close', 'User leaved the game.');
    deleteGameByID(id);
  });


  socket.on('message', ({room, message, player}) => {
    console.log(`User ${player} send message to room ${room}`)
    io.to(room).emit('chatMessage', {player, message})
  })

  socket.on('resetByPeer', (user) => {
    console.log(`User ${user} disconnected.`)
    if (!user) {
      return
    }

    const game = deleteGameByPlayer(user);
    if (!game) {
      return;
    }
    io.to(game.room).emit('close', 'User disconnected from the game.');
  });

  socket.on('disconnect' , () => {
    const game = deleteGameBySocket(socket.id)
    if (!game) {
      return
    }

    io.to(game.room).emit('close', 'User disconnected from the game.');
  })
});
  

server.listen(3001, () => {
  console.log('listening on *:3001');
});
