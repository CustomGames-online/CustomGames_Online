class Checkers {
  constructor(player1) {
    this.board = this.createBoard(player1);
    this.winner = null;
  }

  createBoard(player1) {
    const board = [];

    for (let row = 0; row < 8; row++) {
      board[row] = [];
      for (let col = 0; col < 8; col++) {
        board[row][col] = null;

        if (row === 5 && col % 2 === 0) {
          board[row][col] = { piece: 'pawn', owner: player1 };
        } else if (row === 6 && col % 2 > 0) {
          board[row][col] = { piece: 'pawn', owner: player1 };
        } else if (row === 7 && col % 2 === 0) {
          board[row][col] = { piece: 'pawn', owner: player1 };
        }
      }
    }

    return board;
  }

  startGame(player2) {
    this.finishBoard(player2);
  }

  finishBoard(player2) {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 8; col++) {
        if (row === 0 && col % 2 > 0) {
          this.board[row][col] = { piece: 'pawn', owner: player2 };
        } else if (row === 1 && col % 2 === 0) {
          this.board[row][col] = { piece: 'pawn', owner: player2 };
        } else if (row === 2 && col % 2 > 0) {
          this.board[row][col] = { piece: 'pawn', owner: player2 };
        }
      }
    }
  }

  play(player, row) {
    // Play logic
  }

  checkWinningCondition() {}
}

export default Checkers;
