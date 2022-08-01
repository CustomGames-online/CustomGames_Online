import React, { Component } from "react";
import { Navigate } from "react-router-dom";

import LoginBody from "./components/LoginBody";
import LoginFooter from './components/LoginFooter';

class Login extends Component {

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
      <div className="container">
        { this.state.loggedin === true && (<Navigate to="/gamelobby" />)}
        <LoginBody />
        <LoginFooter />
      </div>
    );
  }
}
export default Login;