import { v4 as uuid } from 'uuid';
import Connect4 from './connect4.js';
import Checkers from './checkers.js';
import Chess from './Chess.js';

export const gameTypes = {
  // enum
  Connect4: 'connect4',
  Checkers: 'checkers',
  Chess: 'chess',
  Gulper: 'gulper',
};

class Game {
  constructor(gameType, player) {
    switch (gameType) {
      case gameTypes.Connect4:
        this.game = new Connect4(player);
        break;
      case gameTypes.Checkers:
        this.game = new Checkers(player);
        break;
      case gameTypes.Chess:
        this.game = new Chess(player);
        break;
      default:
        this.game = null;
        return undefined;
    }

    this.player1 = player;
    this.colors = {};
    this.colors[player] = this.game.colors.player1;
    this.turn = player;
    this.pending = true;
    this.finished = false;
    this.winner = null;
    this.room = uuid();
    this.id = uuid();
    this.winningPattern = null;
    this.gameType = gameType;
    this.lastMovement = { y: null, x: null };
  }

  startGame(player2) {
    this.pending = false;
    this.player2 = player2;
    this.colors[player2] = this.game.colors.player2;
    this.game.startGame(player2);
  }

  play(player, movement) {
    // return if
    if (this.finished || this.turn !== player) {
      return;
    }

    // Play logic
    const [turn, lastMovement] = this.game.play(player, movement, this.turn);
    this.turn = turn;
    this.lastMovement = lastMovement || this.lastMovement


    const [finished, winningPattern, winner] = this.game.checkWinningCondition();


    this.finished = finished
    this.winningPattern = winningPattern
    this.winner = winner
  }
}

export default Game;
