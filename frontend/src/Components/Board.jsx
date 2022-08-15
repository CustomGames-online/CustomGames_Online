/* eslint-disable */

import { useState, useEffect } from 'react';
import Chat from "./Chat";
import { ReactP5Wrapper } from 'react-p5-wrapper';
import { Modes } from "../utils/Constants";
import styles from './Board.module.css';

const Board = ({ gameType, sketch, socket, mode, id, userName, exit }) => {
  const [game, setGame] = useState(null);
  const [move, setMove] = useState({ able: false });
  const [from, setFrom] = useState({});
  const [messages, setMessages] = useState([])

  const exitGame = () => {
    socket.emit('leave', game?.id);
    exit()
  }

  const play = (movement) => {
    socket.emit('play', { gameObj: game, player: userName, movement });
  };

  const sendMessage = (message) => {
    console.log(message)
    if (!game) {
      return
    }

    socket.emit('message', { room: game.room, player: userName, message })
  }

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

    window.onbeforeunload = () => {
      socket.emit('resetByPeer', userName)
      return true
    };

    socket.on('game', (gameObj) => {
      console.log('Game arrived.');
      setGame(gameObj);
    });

    socket.on('chatMessage', (message) => {
      console.log('Message Arrived')
      setMessages(prevState => ([...prevState, message]))
    })

    socket.on('close', (msg) => {
      console.log(msg);
      exit();
    });

    socket.emit('newGame', { gameType, user: userName, mode, id });

    return () => {
      socket.emit('resetByPeer', userName);
      socket.off('game');
      socket.off('chatMessage')
      socket.off('close')
    };
  }, [socket, gameType]);

  const privateMatchPanel = () => {
    if (game && mode === Modes.Private) {
      return (
          <div>
            <span>Match ID: </span>
            <span className={styles.sessionID} onClick={() => navigator.clipboard.writeText(game.id)}>{game.id}</span>
          </div>
      )
    }
  }

  return (
    <main className={styles.main}>
      <section className={styles.left}>
        <div className={styles.users}>{game?.player1 === userName ? game?.player2 : game?.player1 || 'pending'}</div>
        <div>{privateMatchPanel()}</div>
        <div id='canvas' className={styles.canvas}>
          <ReactP5Wrapper
            game={game}
            play={play}
            player={userName}
            sketch={sketch}
            move={move}
            setMove={setMove}
            removePiece={removePiece}
            from={from}
            setFrom={setFrom}
          />
        </div>
        <div className={styles.users}>{userName}</div>
      </section>
      <Chat
          messages={messages}
          sendMessage={sendMessage}
          users={[userName, game?.player1 === userName ? game?.player2 : game?.player1 || '']}
          exit={exitGame}

      />
    </main>
  );
};

export default Board;
