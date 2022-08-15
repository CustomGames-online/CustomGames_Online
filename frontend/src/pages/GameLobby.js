import React from "react";

// import GameLobbyBody from "./components/GameLobbyBody";
import HomePageFooter from "./components/HomePageFooter";
import Games from '../App'

import { Navigate } from 'react-router-dom';

export default class GameLobby extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedin: true
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
        this.setState({ loggedin: true })
      } else {
        this.setState({ loggedin: false })
      }
    })

    if ( localStorage.getItem("token") ) {
      this.setState({ loggedin: true })
    } else {
      this.setState({ loggedin: false })
      }
    }

  render() {

    return(
      <div className="gamelobby-div">
        {this.state.loggedin === false && <Navigate to="/" />}
        <Games />
        <HomePageFooter loggedin={this.state.loggedin}/>
      </div>
    );
  }
}
