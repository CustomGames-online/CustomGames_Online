import { v4 as uuid } from 'uuid';
import Connect4 from './connect4.js';
import Checkers from './checkers.js';
<<<<<<< HEAD
import Chess from './chess.js';

export const gameTypes = {
=======
import Chess from './Chess.js';

export const gameTypes = {
  // enum
>>>>>>> 2c724ed7125198bd9f0f1d9dd9b3c050a2e864c1
  Connect4: 'connect4',
  Checkers: 'checkers',
  Chess: 'chess',
  Gulper: 'gulper',
};

class Game {
  constructor(gameType, player) {
    switch (gameType) {
      case gameTypes.Connect4:
<<<<<<< HEAD
        this.game = new Connect4();
=======
        this.game = new Connect4(player);
>>>>>>> 2c724ed7125198bd9f0f1d9dd9b3c050a2e864c1
        break;
      case gameTypes.Checkers:
        this.game = new Checkers(player);
        break;
      case gameTypes.Chess:
        this.game = new Chess(player);
        break;
      default:
        this.game = null;
<<<<<<< HEAD
        break;
=======
        return undefined;
>>>>>>> 2c724ed7125198bd9f0f1d9dd9b3c050a2e864c1
    }

    this.player1 = player;
    this.colors = {};
<<<<<<< HEAD
    this.colors[player] = 'red';
=======
    this.colors[player] = this.game.colors.player1;
>>>>>>> 2c724ed7125198bd9f0f1d9dd9b3c050a2e864c1
    this.turn = player;
    this.pending = true;
    this.finished = false;
    this.winner = null;
    this.room = uuid();
    this.id = uuid();
    this.winningPattern = null;
<<<<<<< HEAD
=======
    this.gameType = gameType;
    this.lastMovement = { y: null, x: null };
>>>>>>> 2c724ed7125198bd9f0f1d9dd9b3c050a2e864c1
  }

  startGame(player2) {
    this.pending = false;
    this.player2 = player2;
<<<<<<< HEAD
    this.colors[player2] = 'yellow';
    this.game.startGame(player2);
  }

  play(player, play) {
=======
    this.colors[player2] = this.game.colors.player2;
    this.game.startGame(player2);
  }

  play(player, movement) {
>>>>>>> 2c724ed7125198bd9f0f1d9dd9b3c050a2e864c1
    // return if
    if (this.finished || this.turn !== player) {
      return;
    }

<<<<<<< HEAD
    // update turn
    if (player === this.player1) {
      this.turn = this.player2;
    } else {
      this.turn = this.player1;
    }

    // Play logic
    this.game.play(player, play);
    const { finished, winningPattern, winner } =
      this.game.checkWinningCondition();
    this.finished = finished;
    this.winningPattern = winningPattern;
    this.winner = winner;
=======
    // Play logic
    const [turn, lastMovement] = this.game.play(player, movement, this.turn);
    this.turn = turn;
    this.lastMovement = lastMovement || this.lastMovement


    const [finished, winningPattern, winner] = this.game.checkWinningCondition();


    this.finished = finished
    this.winningPattern = winningPattern
    this.winner = winner
>>>>>>> 2c724ed7125198bd9f0f1d9dd9b3c050a2e864c1
  }
}

export default Game;
