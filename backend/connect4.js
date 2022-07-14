class Connect4 {
  constructor() {
    this.board = this.createBoard();
    this.winner = null;
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
  }

  addDot(col, player) {
    let row = 5;

    while (this.board[row][col] != null && row > -1) {
      row--;
    }

    if (row < 0) {
      return;
    }

    this.board[row][col] = player;
  }

  checkWinningCondition() {
    if (this.checkVerticalCondition()) {
      return this.winningObj(true, 'vertical', this.winner);
    } else if (this.checkHorizontalCondition()) {
      return this.winningObj(true, 'horizontal', this.winner);
    } else if (this.checkDiagonalCondition()) {
      return this.winningObj(true, 'diagonal', this.winner);
    } else {
      return this.winningObj(false, null, null);
    }
  }

  checkVerticalCondition() {
    let counter = 0;
    let winner = null;
    for (let col = 0; col < 7; col++) {
      for (let row = 1; row < 6; row++) {
        const value = this.board[row][col];
        if (value === this.board[row - 1][col] && value !== null) {
          console.log(counter);
          counter++;
          console.log(counter);
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
          if (temp == true) {
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

  winningObj(finished, winningPattern, winner) {
    return {
      finished,
      winningPattern,
      winner,
    };
  }
}

export default Connect4;
