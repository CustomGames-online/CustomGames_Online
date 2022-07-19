import { v4 as uuid } from 'uuid';
import Connect4 from './connect4.js';
import Checkers from './checkers.js';
import Chess from './chess.js';

export const gameTypes = {
  Connect4: 'connect4',
  Checkers: 'checkers',
  Chess: 'chess',
  Gulper: 'gulper',
};

class Game {
  constructor(gameType, player) {
    switch (gameType) {
      case gameTypes.Connect4:
        this.game = new Connect4();
        break;
      case gameTypes.Checkers:
        this.game = new Checkers(player);
        break;
      case gameTypes.Chess:
        this.game = new Chess(player);
        break;
      default:
        this.game = null;
        break;
    }

    this.player1 = player;
    this.colors = {};
    this.colors[player] = 'red';
    this.turn = player;
    this.pending = true;
    this.finished = false;
    this.winner = null;
    this.room = uuid();
    this.id = uuid();
    this.winningPattern = null;
  }

  startGame(player2) {
    this.pending = false;
    this.player2 = player2;
    this.colors[player2] = 'yellow';
    this.game.startGame(player2);
  }

  play(player, play) {
    // return if
    if (this.finished || this.turn !== player) {
      return;
    }

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
  }
}

export default Game;
