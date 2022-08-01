import { useState, useEffect } from 'react';
import { ReactP5Wrapper } from 'react-p5-wrapper';
import styles from './Board.module.css';

const Board = ({ gameType, sketch, socket, exit }) => {
  const [game, setGame] = useState(null);
  const [move, setMove] = useState({ able: false });
  const [from, setFrom] = useState({});
  const play = (movement) => {
    socket.emit('play', { gameObj: game, player: socket.id, movement });
  };

  const removePiece = (row, column) => {
    if (!game) {
      return;
    }

    const _game = { ...game };
    _game.game.board[row][column] = null;
    setGame(_game);
  };

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on('game', (gameObj) => {
      console.log('Game arrived.');
      setGame(gameObj);
    });

    socket.on('close', (msg) => {
      exit();
    });

    socket.emit('newGame', { gameType, user: 'prime' });

    return () => {
      socket.off('game');
      socket.emit('leave', game?.id);
    };
  }, [socket, gameType]);

  return (
    <main className={styles.main}>
      <section className={styles.left}>
        <div>SCORE username(rating)</div>
        <div id='canvas' className={styles.canvas}>
          <ReactP5Wrapper
            game={game}
            play={play}
            sketch={sketch}
            move={move}
            setMove={setMove}
            removePiece={removePiece}
            from={from}
            setFrom={setFrom}
          />
        </div>
        <div>SCORE username(rating)</div>
      </section>
      <section className={styles.right}>
        <div className={styles.description}>
          <button className={styles.btn}>New Game</button>
          <button className={styles.btn}>Games</button>
          <button className={styles.btn}>Players</button>

          <div className={styles.margin}>
            <button className={styles.largeBtn}>10 min</button>
            <button className={styles.largeBtn}>PLAY</button>
            <button className={styles.largeBtn}>Challenge Friend</button>
          </div>
        </div>
        <div className={styles.chat}>
          <div></div>
          <input className={styles.input} type='text' />
          <button className={styles.inputBtn}>Send</button>
        </div>
      </section>
    </main>
  );
};

export default Board;
