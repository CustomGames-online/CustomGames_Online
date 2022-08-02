<<<<<<< HEAD
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
=======
import React from "react";

import LoginHeader from './components/LoginHeader';
import LoginBody from "./components/LoginBody";
import LoginFooter from "./components/LoginFooter";

export default class Login extends React.Component {
  render() {

    return(
      <div>
        <LoginHeader />
>>>>>>> 2c724ed7125198bd9f0f1d9dd9b3c050a2e864c1
        <LoginBody />
        <LoginFooter />
      </div>
    );
  }
<<<<<<< HEAD
}
export default Login;
=======
}
>>>>>>> 2c724ed7125198bd9f0f1d9dd9b3c050a2e864c1
