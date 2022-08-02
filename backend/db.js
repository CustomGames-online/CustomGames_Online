let games = [];

export function saveGame(game) {
  games = [...games, game];
}

export function getGameQueue(gameType) /* Game | undefined */ {
  console.log(games);
  const index = games.findIndex(
    (game) => game.pending === true && game.gameType === gameType
  );

  if (index === -1) {
    return undefined;
  }

  return games[index];
}

export function getGameByID(id) {
  const index = games.findIndex((game) => game.id === id);

  if (index === -1) {
    return undefined;
  }

  return games[index];
}

export function updateGame(gameObj) {
  const index = games.findIndex((game) => game.id === gameObj.id);

  if (index === -1) {
    return undefined;
  }

  games[index] = gameObj;
}

export function deleteGameByPlayer(player) {
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
}
