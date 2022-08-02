import express from 'express';
import http from 'http';
import {
  saveGame,
  getGameQueue,
  getGameByID,
  updateGame,
  deleteGameByPlayer,
  deleteGameByID,
} from './db.js';
import Game from './Game.js';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(
  server,
  /* options */ {
    cors: {
      origin: '*', // backend address
    },
  }
);
// onConnection(socket) => socket.onMessage()

io.on('connection', (socket) => {
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

server.listen(3001, () => {
  console.log('listening on *:3001');
});
