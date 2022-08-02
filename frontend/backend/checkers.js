class Checkers {
  constructor(player1) {
    this.player1 = player1;
    this.board = this.createBoard(player1);
    this.winner = null;
    this.verticalMovement = {};
    this.verticalMovement[player1] = -1;
    this.colors = {
      player1: ['#b09652', '#bda358'],
      player2: ['#3f3e3f', '#4a4a4a'],
    };
    this.playCount = 0
  }

  createBoard(player1) {
    const board = [];

    for (let row = 0; row < 8; row++) {
      board[row] = [];
      for (let col = 0; col < 8; col++) {
        board[row][col] = null;

        if (row === 5 && col % 2 === 0) {
          board[row][col] = {piece: 'pawn', owner: player1};
        } else if (row === 6 && col % 2 > 0) {
          board[row][col] = {piece: 'pawn', owner: player1};
        } else if (row === 7 && col % 2 === 0) {
          board[row][col] = {piece: 'pawn', owner: player1};
        }
      }
    }

    return board;
  }

  startGame(player2) {
    this.player2 = player2;
    this.finishBoard(player2);
  }

  finishBoard(player2) {
    this.verticalMovement[player2] = 1;

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 8; col++) {
        if (row === 0 && col % 2 > 0) {
          this.board[row][col] = {piece: 'pawn', owner: player2};
        } else if (row === 1 && col % 2 === 0) {
          this.board[row][col] = {piece: 'pawn', owner: player2};
        } else if (row === 2 && col % 2 > 0) {
          this.board[row][col] = {piece: 'pawn', owner: player2};
        }
      }
    }
  }

  play(player, playObj, turn) {
    // Play logic
    const {from, to} = playObj;
    const king = this.board[from.y][from.x].piece === 'king'
    const kingVerticalMovement = to.y < from.y ? -1 : 1
    const verticalMovement = king ? kingVerticalMovement : this.verticalMovement[player]
    const horizontalMovement = to.x < from.x ? -1 : 1;

    if (!this.board[from.y][from.x]) {
      console.log('Empty');
      return [turn, null];
    } else if (this.board[from.y][from.x].owner !== player) {
      console.log(
          "Player doesn't own piece",
          this.board[from.y][from.x].owner,
          player
      );
      return [turn, null];
    } else if (this.board[to.y][to.x]) {
      console.log(
          'There is a piece on the to position',
          this.board[to.y][to.x],
          player
      );
      return [turn, null];
    } else if (!king && from.x === to.x) {
      console.log('Illegal move, only diagonal direction allowed');
      return [turn, null];
    }

    if (this.board[from.y][from.x].piece === 'pawn') {
      if (
          (verticalMovement === 1 && from.y > to.y) ||
          (verticalMovement === -1 && from.y < to.y)
      ) {
        console.log(
            'Illegal move, only forward direction allowed',
            verticalMovement,
            from.y,
            to.y
        );
        return [turn, null];
      }
    }

    if (
        from.x + horizontalMovement !== to.x ||
        from.y + verticalMovement !== to.y
    ) {
      if (from.y + verticalMovement * 2 !== to.y) {
        console.log('Illegal move, only one movement at once allowed :y', from.y, to.y, verticalMovement, kingVerticalMovement, this.board[from.y][from.x].piece);
        return [turn, null];
      } else if (from.x + horizontalMovement * 2 !== to.x) {
        console.log('Illegal move, only one movement at once allowed :x', from.x, to.x, horizontalMovement);
        return [turn, null];
      }

      let blankSpace = 0;
      let ownedByPlayer = false;

      //play logic
      if (this.board[to.y][to.x]) {
        blankSpace = 1;
      }

      if (this.board[from.y + verticalMovement][from.x + horizontalMovement]) {
        if (this.board[from.y + verticalMovement][from.x + horizontalMovement].owner === player) {
          ownedByPlayer = true
        }
      } else {
        console.log('Illegal move', blankSpace, ownedByPlayer);
        return [turn, null];
      }

      if (blankSpace !== 0 || ownedByPlayer) {
        console.log('Illegal move', blankSpace, ownedByPlayer);
        return [turn, null];
      }

      this.clearPiece(from.y + verticalMovement, from.x + horizontalMovement)
      this.playCount = 0

      let movementAvailable = true
      while (movementAvailable) {
        movementAvailable = false

        if (king || verticalMovement * 1 === -1) {
          if (to.y - 2 > -1 && to.x + 2 < 8) {
            console.log('checking y-2 x+2')
            if (this.board[to.y - 1][to.x + 1] && this.board[to.y - 1][to.x + 1].owner !== player && !this.board[to.y - 2][to.x + 2]) {
              console.log('removing y-1 x+1')
              movementAvailable = true
              this.clearPiece(to.y - 1, to.x + 1)
              to.y = to.y - 2
              to.x = to.x + 2
            }
          }

          if (to.y - 2 > -1 && to.x - 2 > -1) {

            console.log('checking y-2 x-2')
            if (this.board[to.y - 1][to.x - 1] && this.board[to.y - 1][to.x - 1].owner !== player && !this.board[to.y - 2][to.x - 2]) {
              console.log('removing y-1 x-1')
              movementAvailable = true
              this.clearPiece(to.y - 1, to.x - 1)
              to.y = to.y - 2
              to.x = to.x - 2
            }
          }
        }

        if (king || verticalMovement * -1 === -1) {
          if (to.y + 2 < 8 && to.x + 2 < 8) {
            if (this.board[to.y + 1][to.x + 1] && this.board[to.y + 1][to.x + 1].owner !== player && !this.board[to.y + 2][to.x + 2]) {
              movementAvailable = true
              this.clearPiece(to.y + 1, to.x + 1)
              to.y = to.y + 2
              to.x = to.x + 2
            }
          }

          if (to.y + 2 < 8 && to.x - 2 > -1) {
            console.log('checking y+1 x-1')
            if (this.board[to.y + 1][to.x - 1] && this.board[to.y + 1][to.x - 1].owner !== player && !this.board[to.y + 2][to.x - 2]) {
              console.log('removing y+1 x-1')
              movementAvailable = true
              this.clearPiece(to.y + 1, to.x - 1)
              to.y = to.y + 2
              to.x = to.x - 2
            }
          }
        }
      }
    } else {
      this.playCount++
    }
      const piece = this.board[from.y][from.x]
      console.log('Moving Piece');
      console.log(piece);
      this.clearPiece(from.y, from.x);
      this.board[to.y][to.x] = piece;
      console.log(verticalMovement, to.y, this.board[to.y][to.x].piece);
      if (verticalMovement && to.y === 7) {
        this.board[to.y][to.x].piece = 'king';
      } else if (verticalMovement === -1 && to.y === 0) {
        this.board[to.y][to.x].piece = 'king';
      }



      // update turn
      const newTurn = turn === this.player1 ? this.player2 : this.player1;
      return [newTurn, {y: to.y, x: to.x}];
    }

    clearPiece(row, column)
    {
      this.board[row][column] = null;
    }


    checkWinningCondition()
    {
      let player = null
      let piecesFromBothPlayersLeft = false
      let canMove = {}
      canMove[this.player1] = false
      canMove[this.player2] = false

      for (let row = 0; row < 8; row ++) {
        for (let column = 0; column < 8; column++) {
          let king = null
          let verticalMovement = null

          if (!this.board[row][column]) {
            continue
          } else {
            king = this.board[row][column].piece === 'king'
            verticalMovement = this.verticalMovement[this.board[row][column].owner]
          }
          if (!player && this.board[row][column]) {
            player = this.board[row][column].owner
          }

          if (this.board[row][column] && this.board[row][column].owner !== player) {
            piecesFromBothPlayersLeft = true
          }


          if (king || verticalMovement * 1 === -1) {
            if (this.board[row][column] && row - 2 > -1 && column + 2 < 8) {
              if (this.board[row - 1][column + 1] && !this.board[row - 2][column + 2]) {
                canMove[this.board[row][column].owner] = true
              } else if (!this.board[row - 1][column + 1]) {
                canMove[this.board[row][column].owner] = true
              }
            }

            if (this.board[row][column] && row - 2 > -1 && column - 2 > -1) {
              if (this.board[row - 1][column - 1] && !this.board[row - 2][column - 2]) {
                canMove[this.board[row][column].owner] = true
              } else if (!this.board[row - 1][column - 1]) {
                canMove[this.board[row][column].owner] = true
              }
            }
          }

          if (king || verticalMovement * -1 === -1) {
            if (this.board[row][column] && row + 2 < 8 && column + 2 < 8) {
              if (this.board[row + 1][column + 1] && !this.board[row + 2][column + 2]) {
                canMove[this.board[row][column].owner] = true
              } else if (!this.board[row + 1][column + 1]) {
                canMove[this.board[row][column].owner] = true
              }
            }

            if (this.board[row][column] && row + 2 < 8 && column - 2 > -1) {
              if (this.board[row + 1][column - 1] && !this.board[row + 2][column - 2]) {
                canMove[this.board[row][column].owner] = true
              } else if (!this.board[row + 1][column - 1]) {
                canMove[this.board[row][column].owner] = true
              }
            }
          }


        }
      }

      if (!piecesFromBothPlayersLeft) {
        return [true, 'no pieces left', player]
      } else if (!canMove[this.player1]) {
        return [true, 'cannot move', this.player2]
      } else if (!canMove[this.player2]) {
        return [true, 'cannot move', this.player1]
      } else if (this.playCount === 15) {
        return [true, 'moved 15 times without taking a piece.', 'draw']
      }
      
      return [false, null, null];
    }
  }

export default Checkers;
