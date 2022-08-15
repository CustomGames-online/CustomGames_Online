/* eslint-disable */

import './App.css';
import { useState, useEffect } from 'react';
import SelectGame from './Components/SelectGame';
import Board from './Components/Board';
import Connect4 from './Components/Connect4/Sketch';
import Chess from './Components/Chess/Sketch';
import Checkers from './Components/Checkers/Sketch';
import Socket from './Socket';
import {useParams} from "react-router-dom";
import Room from './Components/Room'
import { Modes } from './utils/Constants'


function Games() {
  const { gameType, id } = useParams()
  const [game, setGame] = useState(gameType);
  const [mode, setMode] = useState(Modes.Pending)
  const [userName, setUserName] = useState('')
  const [ID, setID] = useState(null)

  const selectGame = (selectedGame) => setGame(selectedGame);
  const startGame = (game, mode, username, id) => {
    setMode(mode)
    setID(id)
    setUserName(username)
    setGame(game)
  }
  const resetGame = () => {
    setGame(null)
    setMode(Modes.Pending)
    setID(null)
    setUserName('')
  }

  useEffect(() => {
    if (gameType && id !== null) {
      setMode(Modes.Private)
      setID(id)
    }
  }, [gameType, id])

  const render = () => {
    if (game && mode !== Modes.Pending) {
      switch (game) {
        case 'chess':
          return (
            <Socket
              component={Board}
              sketch={Chess}
              gameType={game}
              mode={mode}
              id={ID}
              userName={userName}
              exit={resetGame}
            />
          );
        case 'connect4':
          return (
            <Socket
              component={Board}
              sketch={Connect4}
              gameType={game}
              mode={mode}
              id={ID}
              userName={userName}
              exit={resetGame}
            />
          );
        case 'checkers':
          return (
            <Socket
              component={Board}
              sketch={Checkers}
              gameType={game}
              mode={mode}
              id={ID}
              userName={userName}
              exit={resetGame}
            />
          );
        default:
          return (
            <Socket
              component={Board}
              sketch={Connect4}
              gameType={game}
              mode={mode}
              id={ID}
              userName={userName}
              exit={resetGame}
            />
          );
      }
    }

    return <Room startGame={startGame}/>
  };

  return <>{render()}</>;
}

export default Games;
