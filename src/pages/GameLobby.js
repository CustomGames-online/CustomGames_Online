import React from "react";

import GameLobbyHeader from "./components/GameLobbyHeader";

export default class GameLobby extends React.Component {
  render() {

    return(
      <div className="gamelobby-div">
        <GameLobbyHeader />
      </div>
    );
  }
}
