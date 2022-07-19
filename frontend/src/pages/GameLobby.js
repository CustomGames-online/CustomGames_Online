import React from "react";

import GameLobbyHeader from "./components/GameLobbyHeader";
import GameLobbyBody from "./components/GameLobbyBody";
import HomePageFooter from "./components/HomePageFooter";

export default class GameLobby extends React.Component {
  render() {

    return(
      <div className="gamelobby-div">
        <GameLobbyHeader />
        <GameLobbyBody />
        <HomePageFooter />
      </div>
    );
  }
}
