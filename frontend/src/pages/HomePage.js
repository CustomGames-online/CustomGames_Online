import React from "react";

import HomePageBody from "./components/HomePageBody";
import HomePageFooter from './components/HomePageFooter';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedin: false
    }
  }

  componentDidMount() {
    if ( localStorage.getItem("token") ) {
      this.setState({ loggedin: true })
    }
  }

  render() {
    return(
      <div className="homepage-div">
        <HomePageBody loggedin={this.state.loggedin} />
        <HomePageFooter loggedin={this.state.loggedin}/>
      </div>
    );
  }
}

  