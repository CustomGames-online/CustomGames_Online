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

  startGame(player2) {
    this.player2 = player2;
  }

  play(player, col, turn) {
    // Play logic
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
      return [true, 'vertical', this.winner]; // {finished, winningCondition, winner}
    } else if (this.checkHorizontalCondition()) {
      return [true, 'horizontal', this.winner];
    } else if (this.checkDiagonalCondition()) {
      return [true, 'diagonal', this.winner];
    } else {
      return [false, null, null];
    }
  }

  checkVerticalCondition() {
    let counter = 0;
    let winner = null;
    for (let col = 0; col < 7; col++) {
      for (let row = 1; row < 6; row++) {
        const value = this.board[row][col];
        if (value === this.board[row - 1][col] && value !== null) {
          counter++;
          winner = this.board[row][col];
          if (counter === 3) {
            this.winner = winner;
            return true;
          }
        } else {
          counter = 0;
        }
      }
    }

    return false;
  }

  checkHorizontalCondition() {
    let counter = 0;

    for (let row = 0; row < 6; row++) {
      for (let col = 1; col < 7; col++) {
        if (
            this.board[row][col] === this.board[row][col - 1] &&
            this.board[row][col] !== null
        ) {
          counter++;
          if (counter === 3) {
            this.finished = true;
            this.winner = this.board[row][col];
            return true;
          }
        } else {
          counter = 0;
        }
      }
    }

    return false;
  }

  checkDiagonalCondition() {
    const cols = 7;
    const rows = 6;
    let winner = null

    for (let j = 0; j <= rows - 4; j++) {
      for (let i = 0; i <= cols - 4; i++) {
        if (this.board[j][i] != null) {
          let temp = true;
          winner = this.board[j][i]
          for (let k = 1; k < 4; k++) {
            if (this.board[j + k][i + k] !== this.board[j][i]) {
              temp = false;
            }
          }
          if (temp === true) {
            this.winner = winner
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
        let winner = this.board[row][col];

        let count = 0;
        for (let k = 1; row - k > -1 && col + k < 7; k++) {
          if (this.board[row - k][col + k] === test && test !== null) {
            count++; // false
            if (count === 3) {
              this.winner = winner
              return true;
            }
          } else {
            count = 0;
            test = this.board[row - k][col + k];
            winner = this.board[row - k][col + k]
          }
        }
      }
    }

    return false;
  }
}

export default Connect4;