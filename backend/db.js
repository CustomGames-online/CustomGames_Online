let games = [];

export function saveGame(game) {
  games = [...games, game];
}

<<<<<<< HEAD
export function getGameQueue() {
  console.log(games);
  const index = games.findIndex((game) => game.pending === true);

  if (index === -1) {
    return null;
=======
export function getGameQueue(gameType) /* Game | undefined */ {
  console.log(games);
  const index = games.findIndex(
    (game) => game.pending === true && game.gameType === gameType
  );

  if (index === -1) {
    return undefined;
>>>>>>> 2c724ed7125198bd9f0f1d9dd9b3c050a2e864c1
  }

  return games[index];
}

export function getGameByID(id) {
  const index = games.findIndex((game) => game.id === id);

<<<<<<< HEAD
=======
  if (index === -1) {
    return undefined;
  }

>>>>>>> 2c724ed7125198bd9f0f1d9dd9b3c050a2e864c1
  return games[index];
}

export function updateGame(gameObj) {
  const index = games.findIndex((game) => game.id === gameObj.id);

<<<<<<< HEAD
=======
  if (index === -1) {
    return undefined;
  }

>>>>>>> 2c724ed7125198bd9f0f1d9dd9b3c050a2e864c1
  games[index] = gameObj;
}

export function deleteGameByPlayer(player) {
<<<<<<< HEAD
  games = games.filter(
    (game) => game.player1 !== player || game.player2 !== player
  );
=======
  const index = games.findIndex(
    (game) => game.player1 === player || game.player2 === player
  );

  if (index === -1) {
    return undefined;
  }

  const game = games.splice(index, 1);
  return game[0];
}

export function deleteGameByID(id) {
  const index = games.findIndex((game) => game.id === id);

  if (index === -1) {
    return undefined;
  }

  games.splice(index, 1);
>>>>>>> 2c724ed7125198bd9f0f1d9dd9b3c050a2e864c1
}
