import './App.css';
import { useState } from 'react';
import SelectGame from './Components/SelectGame';
import Board from './Components/Board';
import Connect4 from './Components/Connect4/Sketch';
import Chess from './Components/Chess/Sketch';
import Checkers from './Components/Checkers/Sketch';
import Socket from './Socket';

function App() {
  const [game, setGame] = useState(null);

  const selectGame = (selectedGame) => setGame(selectedGame);

  const render = () => {
    if (game) {
      switch (game) {
        case 'chess':
          return (
            <Socket
              component={Board}
              sketch={Chess}
              gameType={game}
              exit={() => setGame(null)}
            />
          );
        case 'connect4':
          return (
            <Socket
              component={Board}
              sketch={Connect4}
              gameType={game}
              exit={() => setGame(null)}
            />
          );
        case 'checkers':
          return (
            <Socket
              component={Board}
              sketch={Checkers}
              gameType={game}
              exit={() => setGame(null)}
            />
          );
        default:
          return (
            <Socket
              component={Board}
              sketch={Connect4}
              gameType={game}
              exit={() => setGame(null)}
            />
          );
      }
    }

    return <SelectGame selectGame={selectGame} />;
  };

  return <div>{render()}</div>;
}

export default App;
