import React, { Component } from "react";
import { Navigate } from "react-router-dom";

import SignUpBody from "./components/SignUpBody";

import './../styling/GeneralStyling.css';
import HomePageFooter from "./components/HomePageFooter";


class SignUp extends Component {

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
    return (
      <div className="signup">
        { this.state.loggedin === true && (<Navigate to="/gamelobby" />)}
        <SignUpBody />
        <HomePageFooter />
      </div>
    );
  }
}
export default SignUp;
