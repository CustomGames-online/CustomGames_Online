import ColorSwitching from '../../utils/ColorSwitching';

const Sketch = (p5) => {
  let image = null;

  p5.setup = () => {
    const sketchWidth = document.getElementById('canvas').offsetWidth;
    const sketchHeight = document.getElementById('canvas').offsetHeight;
    let renderer = p5.createCanvas(sketchWidth, sketchHeight);
    renderer.parent('canvas');
    image = p5.loadImage('/star.png');
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

    const drawPiece = (
      x,
      y,
      stroke = '#69462c',
      fill = '#4d331f',
      highlight = null,
      king = false
    ) => {
      const letterSpace = 40;
      const sizeConstraint = p5.width > p5.height ? p5.height : p5.width;
      let squareSize = (sizeConstraint - letterSpace) / 8;
      p5.stroke(highlight || fill);
      p5.strokeWeight(3);
      p5.fill(fill);
      p5.circle(x + squareSize / 2, y + squareSize / 2, squareSize - 1);
      p5.strokeWeight(6);
      p5.stroke(stroke);
      p5.circle(x + squareSize / 2, y + squareSize / 2, squareSize - 10);
      p5.strokeWeight(4);
      p5.circle(x + squareSize / 2, y + squareSize / 2, squareSize - 30);
      p5.circle(x + squareSize / 2, y + squareSize / 2, squareSize - 50);
      p5.circle(x + squareSize / 2, y + squareSize / 2, squareSize / 2);
      if (king) {
        p5.image(
          image,
          x + squareSize / 4,
          y + squareSize / 4,
          squareSize / 2,
          squareSize / 2
        );
      }
    };

    p5.draw = () => {
      console.log(game)
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
            const colors = game.colors[game.game.board[row][column].owner];
            let highlight = null;
            let king = false;
            if (row === game.lastMovement.y && column === game.lastMovement.x) {
              highlight = 'green';
            }
            if (game.game.board[row][column].piece === 'king') {
              king = true;
            }
            drawPiece(x, y, colors[1], colors[0], highlight, king);
          }
          if (move.able) {
            const king = move.piece === 'king'
            const colors = game.colors[move.owner];
            drawPiece(p5.mouseX - squareSize / 2, p5.mouseY - squareSize / 2, colors[1], colors[0], null, king);
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
        setMove({able: false});
        setFrom((prevState) => ({ ...prevState, to: { y, x } }));
        play({ from, to: { y, x } });
      } else if (game.game.board[y][x]) {
        setMove({able: true, piece: game.game.board[y][x].piece, owner: game.game.board[y][x].owner});
        removePiece(y, x);
        setFrom({ y, x });
      }
    };
  };
};

export default Sketch;
