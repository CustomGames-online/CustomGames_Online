const Sketch = (p5) => {
  p5.setup = () => {
    const sketchWidth = document.getElementById('canvas').offsetWidth;
    const sketchHeight = document.getElementById('canvas').offsetHeight;
    let renderer = p5.createCanvas(sketchWidth, sketchHeight);
    renderer.parent('canvas');
    // p5.rectMode(p5.CORNERS);
    // renderer.position(0, 0, 'fixed');
  };

  p5.updateWithProps = ({ game, play }) => {
    if (!game || game.pending) {
      p5.draw = () => {
        p5.fill('red');
        p5.textAlign(p5.CENTER, p5.CENTER);
        p5.textSize(40);
        p5.text('Waiting for player...', p5.width / 2, p5.height / 2 - 40);
      };
      return;
    }

    console.log(game);

    p5.draw = () => {
      p5.windowResized = () => {
        const sketchWidth = document.getElementById('canvas').offsetWidth;
        const sketchHeight = document.getElementById('canvas').offsetHeight;
        p5.resizeCanvas(sketchWidth, sketchHeight);
      };
      // p5.translate((-1 * p5.width) / 2, (-1 * p5.height) / 2);

      // p5.background('yellow');

      const w = p5.width / 7;
      const h = p5.height / 7;
      const diameter = w > h ? h : w;
      // ellipse(x, y, w, [h])

      p5.background(0, 0, 255);

      for (let x = 0; x < p5.width; x += w) {
        p5.stroke(0);
        p5.strokeWeight(2);
        p5.line(x, h, x, p5.height);

        // p5.stroke(0);
        p5.noStroke();
        p5.smooth();
        // p5.strokeWeight(2);
        p5.fill(0, 0, 255);
        p5.ellipse(x + w / 2, 0 + h / 2, diameter);
      }

      let row = 0;
      let column = 0;

      p5.stroke(0);
      p5.strokeWeight(2);
      p5.line(0, h, p5.width, h);
      const zoomBugFix = 0.1;

      for (let y = h + zoomBugFix; y < p5.height; y += h) {
        for (let x = 0; x < p5.width; x += w) {
          if (game.game.board[row][column]) {
            p5.stroke(0);
            p5.smooth();
            p5.strokeWeight(2);
            p5.fill(game.colors[game.game.board[row][column]]);
            p5.ellipse(x + w / 2, y + h / 2, diameter);
            column++;
            continue;
          }

          p5.stroke(0);
          p5.smooth();
          p5.strokeWeight(2);
          p5.fill(255);
          p5.ellipse(x + w / 2, y + h / 2, diameter);
          column++;
        }
        column = 0;
        row++;
      }

      if (game.finished) {
        p5.draw = () => {
          p5.fill('red');
          p5.textAlign(p5.CENTER, p5.CENTER);
          p5.textSize(40);
          p5.text(`Game Over, ${game.winner} won!`, p5.width / 2, p5.height / 2 - 40);
        };
        return;
      }

      const playerPos = Math.floor(p5.mouseX / w);
      p5.fill(0, 250, 150);
      p5.noStroke();
      p5.ellipse((playerPos + 0.5) * w, h / 2, diameter - 10);
    };

    p5.mousePressed = () => {
      if (game.finished) {
        return;
      }

      const w = p5.width / 7;
      const h = p5.height / 7;
      const playerPos = Math.floor(p5.mouseX / w);
      if (playerPos > 6 || playerPos < 0) {
        return;
      } else if (p5.mouseY / h < 0 || p5.mouseY / h > 7) {
        return;
      }

      play(playerPos);
    };
  };
};

export default Sketch;
