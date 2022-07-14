class Chess {
  constructor() {
    this.board = this.createBoard();
    this.winner = null;
  }

  createBoard() {
    const board = [];

    for (let col = 0; col < 8; col++) {
      for (let row = 0; row < 8; row++) {
        if (!board[row]) {
          board[row] = [];
        }
        board[col][row] = null;

        //       if (row === 6) {
        // board[row][col] = { piece: 'pawn', owner: player1 };
        // }
      }
    }

    return board;
  }

  startGame() {}

  play(player, row) {
    // Play logic
  }

  checkWinningCondition() {}
}

export default Chess;
