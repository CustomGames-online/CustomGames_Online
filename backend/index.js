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
  saveGame,
  getGameQueue,
  getGameByID,
  updateGame,
  deleteGameByPlayer,
  deleteGameByID,
} from './db.js';
import Game from './game.js';

io.on('connection', (socket) => {
  if (socket) {
    console.log('socket connected')
  }
  socket.on('newGame', ({ gameType, user }) => {
    const game = getGameQueue(gameType); // get first game with pending equal to true and return it
    console.log(`Player ${socket.id} requested new game of ${gameType}.`);
    if (!game) {
      console.log('No game available on queue.');
      const newGame = new Game(gameType, socket.id);
      socket.join(newGame.room);
      saveGame(newGame);
      return;
    }
    socket.join(game.room);
    game.startGame(socket.id);
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
  socket.on('leave', (gameID) => {
    const game = getGameByID(gameID);
    if (!game) {
      return;
    }
    io.to(game.room).emit('close', 'User leaved the game.');
    deleteGameByID(gameID);
  });
  socket.on('disconnect', () => {
    const game = deleteGameByPlayer(socket.id);
    if (!game) {
      return;
    }
    io.to(game.room).emit('close', 'User disconnected from the game.');
  });
});
  

server.listen(6000, () => {
  console.log('listening on *:6000');
});
