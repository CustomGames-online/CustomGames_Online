class Chess {
  constructor(player1) {
    this.player1 = player1;
    this.board = this.createBoard(player1);
    this.winner = null;
    this.verticalMovement = {};
    this.verticalMovement[player1] = -1;
    this.playCount = 0
    this.colors = {}
    this.colors[player1] = null
    this.player1count = 16;
    this.player2count = 16;
  }

  createBoard(player1) {
    const board = [];


    for (let row = 0; row < 8; row++) {
      board[row] = [];
      for (let col = 0; col < 8; col++) {
        board[row][col] = null;

        if (row === 6) {
          board[row][col] = {piece: 'pawn', owner: player1};
        } else if (row === 7) {
          if (col === 0 || col === 7) {
            board[row][col] = {piece: 'rook', owner: player1};
          } else if (col === 1 || col === 6) {
            board[row][col] = {piece: 'knight', owner: player1};
          } else if (col === 2 || col === 5) {
            board[row][col] = {piece: 'bishop', owner: player1};
          } else if (col === 3){
            board[row][col] = {piece: 'queen', owner: player1};
          } else if (col === 4){
            board[row][col] = {piece: 'king', owner: player1, moved: false};
          }
        }
      }
    }

    return board;
  }

  startGame(player2) {
    this.player2 = player2;
    this.colors[player2] = null
    this.finishBoard(player2);
  }

  finishBoard(player2) {
    this.verticalMovement[player2] = 1;

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 8; col++) {
        if (row === 1) {
          this.board[row][col] = {piece: 'pawn', owner: player2};
        } else if (row === 0) {
          if (col === 0 || col === 7) {
            this.board[row][col] = {piece: 'rook', owner: this.player2};
          } else if (col === 1 || col === 6) {
            this.board[row][col] = {piece: 'knight', owner: this.player2};
          } else if (col === 2 || col === 5) {
            this.board[row][col] = {piece: 'bishop', owner: this.player2};
          } else if (col === 3){
            this.board[row][col] = {piece: 'queen', owner: this.player2};
          }else if(col === 4){
            this.board[row][col] = {piece: 'king', owner: this.player2, moved: false};
          }
        }
      }
    }
  }

  play(player, playObj, turn) {
    // Play logic
    const {from, to} = playObj;

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
    } else if (from.y === to.y && from.x === to.x) {
      console.log("Must do a move");
      return [turn, null];
    } else if (this.board[to.y][to.x] && this.board[to.y][to.x].owner === player) {
      console.log("Cannot take own piece");
      return [turn, null];
    }

    let illegalMove = false
    const powerVerticalMovement = to.y < from.y ? -1 : 1
    console.log(this.board[from.y][from.x])
    const verticalMovement = this.board[from.y][from.x].piece === 'pawn'
        ? this.verticalMovement[player]
        : powerVerticalMovement
    const horizontalMovement = to.x < from.x ? -1 : 1

    switch (this.board[from.y][from.x].piece) {
      case 'pawn':
        if (
            from.y + verticalMovement === to.y ||
            ((from.y === 1 || from.y === 6) && from.y + verticalMovement * 2 === to.y && !this.board[from.y + verticalMovement][from.x] && from.x === to.x)
        ) {
          if (from.x === to.x) {
            if (this.board[to.y][to.x]) {
              console.log('can take pieces straight')
              illegalMove = true
            }
          } else if (!this.board[to.y][to.x] || from.x + horizontalMovement !== to.x) {
            console.log('can take own piece')
            illegalMove = true
          }
        } else {
          console.log('illegal move on y direction')
          illegalMove = true
        }
        break;
      case 'knight':
        if (from.y + verticalMovement * 2 === to.y) {
          if (from.x + horizontalMovement !== to.x) {
            console.log('illegal move on 1 step', horizontalMovement)
            illegalMove = true
          }
        } else if (from.x + horizontalMovement * 2 === to.x) {
          if (from.y + verticalMovement !== to.y) {
            console.log('illegal move on 1 step', verticalMovement)
            illegalMove = true
          }
        } else {
          console.log('illegal move on 2 steps')
          illegalMove = true
        }
        break;
      case 'bishop':
        if (Math.abs(from.y - to.y) === Math.abs(from.x - to.x)) {
          for (let y = from.y + verticalMovement, x = from.x + horizontalMovement; y !== to.y || x !== to.x; y += verticalMovement, x += horizontalMovement) {
            if (y === to.y || x === to.x) {
              break
            }
            console.log(y, x)
            if (this.board[y][x]) {
              console.log('bishop cannot jump')
              illegalMove = true
              break
            }
          }
        } else {
          console.log('bishop can only move in/on diagonal direction')
          illegalMove = true
        }
        break;
      case 'rook':
        if (from.y === to.y) {
          console.log('x', horizontalMovement)
          for (let x = from.x + horizontalMovement; x !== to.x; x += horizontalMovement) {
            console.log(x)
            if (this.board[from.y][x]) {
              console.log('rook cannot jump x')
              illegalMove = true
              break;
            }
          }
        } else if (from.x === to.x) {
          console.log('y', verticalMovement)
          for (let y = from.y + verticalMovement; y !== to.y; y += verticalMovement) {
            if (y === to.y) {
              break
            }
            console.log(y)
            if (this.board[y][from.x]) {
              console.log('rook cannot skip the piece y')
              illegalMove = true
              break;
            }
          }
        } else {
          console.log('rook can only move in one direction')
          illegalMove = true
        }
        break;
      case 'queen':
        if (Math.abs(from.y - to.y) === Math.abs(from.x - to.x)) {
          for (let y = from.y + verticalMovement, x = from.x + horizontalMovement; y !== to.y || x !== to.x; y += verticalMovement, x += horizontalMovement) {
            if (y === to.y || x === to.x) {
              break
            }
            console.log(y, x)
            if (this.board[y][x]) {
              console.log('bishop cannot jump')
              illegalMove = true
              break
            }
          }
        } else if(from.y === to.y) {
          console.log('x', horizontalMovement)
          for (let x = from.x + horizontalMovement; x !== to.x; x += horizontalMovement) {
            console.log(x)
            if (this.board[from.y][x]) {
              console.log('rook cannot jump x')
              illegalMove = true
              break;
            }
          }
        } else if(from.x === to.x) {
        console.log('y', verticalMovement)
        for(let y = from.y + verticalMovement; y !== to.y; y += verticalMovement){
          if (y === to.y) {
            break
          }
          console.log(y)
          if(this.board[y][from.x]){
            console.log('rook cannot skip the piece y')
            illegalMove = true
            break;
          }
        }
      } else {
        console.log('rook can only move in one direction')
        illegalMove = true
      }
        break
      case 'king':
        if (from.y === 0 || from.y === 7) {
          if (to.x === 2 && !this.board[from.y][from.x].moved && this.board[from.y][0].piece === 'rook' && this.board[from.y][0].owner === player) {
            if (!this.board[from.y][1] && !this.board[from.y][3]) {
              this.board[from.y][from.x].moved = true
              this.board[from.y][3] = this.board[from.y][0]
              this.board[from.y][0] = null
              break
            }
          }
          else if (to.x === 6 && !this.board[from.y][from.x].moved && this.board[from.y][7].piece === 'rook' && this.board[from.y][7].owner === player) {
            if (!this.board[from.y][5]) {
              this.board[from.y][from.x].moved = true
              this.board[from.y][5] = this.board[from.y][7]
              this.board[from.y][7] = null
              break
            }
          }
        }

        if (from.y + verticalMovement === to.y && from.x + horizontalMovement === to.x) {
          this.board[from.y][from.x].moved = true
        }
        else if (from.y === to.y || from.x === to.x) {
          if (from.y + verticalMovement === to.y || from.x + horizontalMovement === to.x) {
            this.board[from.y][from.x].moved = true
          }
          else {
            console.log('king can only move one step')
            illegalMove = true
          }
        }
        else {
          console.log('king can only move one step')
          illegalMove = true
        }
        break;
    }

    if (illegalMove) {
      return [turn, null]
    }

    const piece = this.board[from.y][from.x]
    console.log('Moving Piece');
    console.log(piece);
    this.clearPiece(from.y, from.x);
    this.board[to.y][to.x] = piece;
    console.log(to.y, this.board[to.y][to.x].piece);


    // update turn
    const newTurn = turn === this.player1 ? this.player2 : this.player1;
    return [newTurn, {y: to.y, x: to.x}];
  }

  clearPiece(row, column)
  {
    if (this.board[row][column].owner === player1){
      player2count--;
    }
    else {
      player1count--;
    }
    this.board[row][column] = null;
  }


  checkWinningCondition()
  {
    /*let player = null;
    let piecesFromBothPlayersLeft = false;
    
    for (let row = 0; row < 8; row ++) {
        for (let column = 0; column < 8; column++) {
          if (!this.board[row][column]) {
            continue;
          } else {
            verticalMovement = this.verticalMovement[this.board[row][column].owner];
          }
          if (!player && this.board[row][column]) {
            player = this.board[row][column].owner
          }
          if (this.board[row][column] && this.board[row][column].owner !== player) {
            piecesFromBothPlayersLeft = true
          }*/
    if (this.player2count === 0){
      return [true, 'no pieces left', this.player1];
    } else if (this.player1count === 0){
      return [true, 'no pieces left', this.player2];
    }
          
    
    return [false, null, null];
  }
}

export default Chess;
