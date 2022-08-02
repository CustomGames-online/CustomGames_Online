import ColorSwitching from '../../utils/ColorSwitching';

const Sketch = (p5) => {
  let whitePawn;
  let blackPawn;
  let blackBishop;
  let whiteBishop;
  let blackKing;
  let whiteKing;
  let whiteKnight;
  let blackKnight;
  let blackQueen;
  let whiteQueen;
  let whiteRook;
  let blackRook;

  p5.preload = () => {
    whitePawn = p5.loadImage('/Chess_plt60.png');
    blackPawn = p5.loadImage('/Chess_pdt60.png');
    blackBishop = p5.loadImage('/Chess_bdt60.png');
    whiteBishop = p5.loadImage('/Chess_blt60.png');
    blackKing = p5.loadImage('/Chess_kdt60.png');
    whiteKing = p5.loadImage('/Chess_klt60.png');
    whiteKnight = p5.loadImage('/Chess_nlt60.png');
    blackKnight = p5.loadImage('/Chess_ndt60.png');
    blackQueen = p5.loadImage('/Chess_qdt60.png');
    whiteQueen = p5.loadImage('/Chess_qlt60.png');
    blackRook = p5.loadImage('/Chess_rdt60.png');
    whiteRook = p5.loadImage('/Chess_rlt60.png');
  };

  p5.setup = () => {
    const sketchWidth = document.getElementById('canvas').offsetWidth;
    const sketchHeight = document.getElementById('canvas').offsetHeight;
    let renderer = p5.createCanvas(sketchWidth, sketchHeight);
    renderer.parent('canvas');
    // p5.rectMode(p5.CORNERS);
    // renderer.position(0, 0, 'fixed');
  };

  p5.updateWithProps = ({
                          game,
                          play,
                          move,
                          setMove,
                          removePiece,
                          from,
                          setFrom,
                        }) => {
    if (!game) {
      p5.draw = () => {
        p5.fill('red');
        p5.textAlign(p5.CENTER, p5.CENTER);
        p5.textSize(40);
        p5.text('Waiting for player...', p5.width / 2, p5.height / 2 - 40);
      };

      return;
    }

    const drawLetter = (letter, x, y, size) => {
      p5.strokeWeight(0);
      p5.fill(0, 102, 153, 255);
      p5.textSize(size);
      p5.textAlign(p5.CENTER, p5.CENTER);
      p5.text(letter, x, y);
    };

    const drawPiece = (x, y, piece, owner, highlight = false) => {
      const letterSpace = 40;
      const sizeConstraint = p5.width > p5.height ? p5.height : p5.width;
      let squareSize = (sizeConstraint - letterSpace) / 8;
      if (highlight) {
        p5.stroke(1);
        p5.strokeWeight(0);
        p5.fill('yellow');
        p5.rect(x, y, squareSize, squareSize);
      }
      // p5.image(blackPawn, x, y, squareSize, squareSize);
      if (owner === game.player1) {
        switch(piece) {
          case 'king':
            p5.image(whiteKing, x, y, squareSize, squareSize);
            break
          case 'queen':
            p5.image(whiteQueen, x, y, squareSize, squareSize);
            break
          case 'bishop':
            p5.image(whiteBishop, x, y, squareSize, squareSize);
            break
          case 'knight':
            p5.image(whiteKnight, x, y, squareSize, squareSize);
            break
          case 'rook':
            p5.image(whiteRook, x, y, squareSize, squareSize);
            break
          default:
            p5.image(whitePawn, x, y, squareSize, squareSize);
            return
        }
      } else if(owner === game.player2){
        switch (piece){
          case 'king':
            p5.image(blackKing, x, y, squareSize, squareSize);
            break;
          case 'queen':
            p5.image(blackQueen, x, y, squareSize, squareSize);
          break;
          case 'knight':
            p5.image(blackKnight, x, y, squareSize, squareSize);
            break;
          case 'bishop':
            p5.image(blackBishop, x, y, squareSize, squareSize);
            break;
          case 'rook':
            p5.image(blackRook, x, y, squareSize, squareSize);
            break;
          default:
            p5.image(blackPawn, x, y, squareSize, squareSize);
            return;
        }
      }

    };

    p5.draw = () => {
      p5.windowResized = () => {
        const sketchWidth = document.getElementById('canvas').offsetWidth;
        const sketchHeight = document.getElementById('canvas').offsetHeight;
        p5.resizeCanvas(sketchWidth, sketchHeight);
      };

      p5.background(255, 255, 255);
      const letterSpace = 40;
      const sizeConstraint = p5.width > p5.height ? p5.height : p5.width;
      let squareSize = (sizeConstraint - letterSpace) / 8;
      const switchColor = new ColorSwitching();
      let char = 65;
      let number = 8;
      let row = 0;
      let column = 0;

      for (let y = 0; y < squareSize * 8; y += squareSize) {
        for (let x = 0; x < squareSize * 8; x += squareSize) {
          if (y === squareSize * 7) {
            drawLetter(
                String.fromCharCode(char++),
                x + squareSize / 2,
                y + squareSize + letterSpace / 2,
                30
            );
          }

          p5.stroke(1);
          p5.strokeWeight(0);
          p5.fill(switchColor.switch(y));
          p5.rect(x, y, squareSize, squareSize);

          if (x === 0) {
            drawLetter(number--, x + 5, y + 7, 12);
          }


          if (game.game.board[row][column]) {
            let owner = game.game.board[row][column].owner
            let piece = game.game.board[row][column].piece
            let highlight = false;
            if (row === game.lastMovement.y && column === game.lastMovement.x) {
              highlight = true;
            }
            drawPiece(x, y, piece, owner, highlight);
          }
          if (move.able) {
            drawPiece(p5.mouseX - squareSize / 2, p5.mouseY - squareSize / 2, move.piece, move.owner);
          }

          column++;
        }
        column = 0;
        row++;
      }
    };

    p5.mousePressed = () => {
      const letterSpace = 40;
      const sizeConstraint = p5.width > p5.height ? p5.height : p5.width;
      let w = (sizeConstraint - letterSpace) / 8;
      let h = (sizeConstraint - letterSpace) / 8;
      const x = Math.floor(p5.mouseX / w);
      const y = Math.floor(p5.mouseY / h);

      console.log(x, y, p5.mouseX, p5.mouseY);
      if (move.able && x < 8 && x > -1 && y < 8 && 7 > -1) {
        setMove({ able: false });
        setFrom((prevState) => ({ ...prevState, to: { y, x } }));
        play({ from, to: { y, x } });
      } else if (game.game.board[y][x]) {
        setMove({ able: true, piece: game.game.board[y][x].piece, owner: game.game.board[y][x].owner});
        removePiece(y, x);
        setFrom({ y, x });
      }
    };
  };
};

export default Sketch;


// const Sketch = (p5) => {
//   let whitePawn;
//   let blackPawn;
//   let blackBishop;
//   let whiteBishop;
//   let blackKing;
//   let whiteKing;
//   let whiteKnight;
//   let blackKnight;
//   let blackQueen;
//   let whiteQueen;
//   let whiteRook;
//   let blackRook;
//
//   p5.preload = () => {
//     whitePawn = p5.loadImage('/Chess_plt60.png');
//     blackPawn = p5.loadImage('/Chess_pdt60.png');
//     blackBishop = p5.loadImage('/Chess_bdt60.png');
//     whiteBishop = p5.loadImage('/Chess_blt60.png');
//     blackKing = p5.loadImage('/Chess_kdt60.png');
//     whiteKing = p5.loadImage('/Chess_klt60.png');
//     whiteKnight = p5.loadImage('/Chess_nlt60.png');
//     blackKnight = p5.loadImage('/Chess_ndt60.png');
//     blackQueen = p5.loadImage('/Chess_qdt60.png');
//     whiteQueen = p5.loadImage('/Chess_qlt60.png');
//     blackRook = p5.loadImage('/Chess_rdt60.png');
//     whiteRook = p5.loadImage('/Chess_rlt60.png');
//   };
//
//   p5.setup = () => {
//     const sketchWidth = document.getElementById('canvas').offsetWidth;
//     const sketchHeight = document.getElementById('canvas').offsetHeight;
//     let renderer = p5.createCanvas(sketchWidth, sketchHeight);
//     renderer.parent('canvas');
//     // p5.rectMode(p5.CORNERS);
//     // renderer.position(0, 0, 'fixed');
//   };
//
//   const drawLetter = (letter, x, y) => {
//     p5.strokeWeight(0);
//     p5.fill(0, 102, 153, 255);
//     p5.textSize(30);
//     p5.textAlign(p5.CENTER, p5.CENTER);
//     p5.text(letter, x, y);
//   };
//
//   p5.draw = () => {
//     p5.windowResized = () => {
//       const sketchWidth = document.getElementById('canvas').offsetWidth;
//       const sketchHeight = document.getElementById('canvas').offsetHeight;
//       p5.resizeCanvas(sketchWidth, sketchHeight);
//     };
//
//     p5.background(255, 255, 255);
//     const letterSpace = 40;
//     const sizeConstraint = p5.width > p5.height ? p5.height : p5.width;
//     let squareSize = (sizeConstraint - letterSpace) / 8;
//     const switchColor = new ColorSwitching();
//     let char = 65;
//     let number = 8;
//
//     // function setup() {
//     //   // Top-left corner of the img is at (0, 0)
//     //   // Width and height are the img's original width and height
//     //
//     // }
//     //   stroke(1)
//     //   fill(switchColor.switch(0))
//     //   rect(0,0,squareSize,squareSize)
//     //   text(numSquares++, squareSize/2, squareSize/2)
//
//     //   stroke(1)
//     //   fill(switchColor.switch(0))
//     //   rect(0,squareSize*2,squareSize,squareSize)
//     //   text(numSquares++, squareSize/2, squareSize/2)
//
//     for (let y = 0; y < squareSize * 8; y += squareSize) {
//       for (let x = letterSpace; x < squareSize * 8; x += squareSize) {
//         if (x === letterSpace) {
//           drawLetter(number--, x - letterSpace / 2, y + squareSize / 2);
//         }
//
//         if (y === squareSize * 7) {
//           drawLetter(
//             String.fromCharCode(char++),
//             x + squareSize / 2,
//             y + squareSize + letterSpace / 2
//           );
//           // continue;
//         }
//
//         p5.stroke(1);
//         p5.fill(switchColor.switch(y));
//         p5.rect(x, y, squareSize, squareSize);
//
//         if (y === squareSize * 6) {
//           p5.image(whitePawn, x, y, squareSize, squareSize);
//         }
//       }
//     }
//
//     // const playerPos = Math.floor(p5.mouseX / w);
//     // p5.fill(0, 250, 150);
//     // p5.noStroke();
//     // p5.ellipse((playerPos + 0.5) * w, w / 2, 80);
//   };
// };
//
// export default Sketch;
