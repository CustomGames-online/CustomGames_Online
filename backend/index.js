import express from 'express';
import http from 'http';
import {
  saveGame,
  getGameQueue,
  getGameByID,
  updateGame,
  deleteGameByPlayer,
} from './db.js';
import Game from './game.js';
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
// onConection(socket) => socket.onMessage()

io.on('connection', (socket) => {
  socket.on('newGame', ({ gameType, user }) => {
    const game = getGameQueue();
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

  socket.on('play', ({ gameObj, player, play }) => {
    const game = getGameByID(gameObj.id);
    if (!game) {
      // temporary bugfix
      return;
    }

    game.play(player, play);
    io.to(game.room).emit('game', game);
    updateGame(game);
  });
  socket.on('disconnect', () => {
    deleteGameByPlayer(socket.id);
  });
});

server.listen(3011, () => {
  console.log('listening on *:3011');
});
