class Connect4 {
  constructor(player1) {
    this.player1 = player1;
    this.board = this.createBoard();
    this.winner = null;
    this.colors = { player1: 'red', player2: 'yellow' };
  }

  createBoard() {
    const board = [];

    for (let row = 0; row < 6; row++) {
      board[row] = [];
      for (let col = 0; col < 7; col++) {
        board[row][col] = null;
      }
    }

    return board;
  }

  startGame() {}

  play(player, col) {
    // Play logic
    this.addDot(col, player); //
    let row = 5;

    while (row > -1 && this.board[row][col] != null) {

      row--;
    }

    if (row < 0) {
      return [turn, null];
    }

    this.board[row][col] = player;
    // update turn
    const newTurn = turn === this.player1 ? this.player2 : this.player1;
    return [newTurn, { y: row, x: col }];
  }

  checkWinningCondition() {
    if (this.checkVerticalCondition()) {
      return this.winningObj(true, 'vertical', this.winner);
    } 
    return false;
  }
  checkDiagonalCondition() {
    const cols = 7;
    const rows = 6;

    for (let j = 0; j <= rows - 4; j++) {
      for (let i = 0; i <= cols - 4; i++) {
        const test = this.board[j][i];
        if (test != null) {
          let temp = true;
          for (let k = 1; k < 4; k++) {
            if (this.board[j + k][i + k] !== test) {
              temp = false;
            }
          }
          if (temp === true) {
            return true;
          }
        }
      }
    }

    // Test Antidiagonal
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 7; col++) {
        console.log(row, col);
        let test = this.board[row][col]; //0,4

        let count = 0;
        for (let k = 1; row - k > -1 && col + k < 7; k++) {
          if (this.board[row - k][col + k] === test && test !== null) {
            count++; // false
            if (count === 3) {
              return true;
            }
          } else {
            count = 0;
            test = this.board[row - k][col + k];
          }
        }
      }
    }

    return false;
  }
}

export default Connect4;
