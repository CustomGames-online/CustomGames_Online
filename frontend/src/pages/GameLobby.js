import React from "react";

import GameLobbyBody from "./components/GameLobbyBody";
import HomePageFooter from "./components/HomePageFooter";

import { Navigate } from 'react-router-dom';

export default class GameLobby extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedOff: false
    }
  }

  componentDidMount() {
    fetch('http://customgames.online/api_validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'token': localStorage.getItem("token")
      })
    }).then((res) => {
      return res.json();
    }).then((result) => {
      if ( result['message']) {
        this.setState({ isLoggedOff: false })
      } else {
        this.setState({ isLoggedOff: true })
      }
    })
  }

  render() {

    return(
      <div className="gamelobby-div">
        {this.state.isLoggedOff && <Navigate to="/" />}
        <GameLobbyBody />
        <HomePageFooter />
      </div>
    );
  }
}
