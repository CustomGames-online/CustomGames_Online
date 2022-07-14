let games = [];

export function saveGame(game) {
  games = [...games, game];
}

export function getGameQueue() {
  console.log(games);
  const index = games.findIndex((game) => game.pending === true);

  if (index === -1) {
    return null;
  }

  return games[index];
}

export function getGameByID(id) {
  const index = games.findIndex((game) => game.id === id);

  return games[index];
}

export function updateGame(gameObj) {
  const index = games.findIndex((game) => game.id === gameObj.id);

  games[index] = gameObj;
}

export function deleteGameByPlayer(player) {
  games = games.filter(
    (game) => game.player1 !== player || game.player2 !== player
  );
}
