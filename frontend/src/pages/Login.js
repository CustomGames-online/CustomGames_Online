import React, { Component } from "react";

import LoginBody from "./components/LoginBody";
import LoginFooter from './components/LoginFooter';

class Login extends Component {
  
  render() {
    return (
      <div className="container">
        <LoginBody />
        <LoginFooter />
      </div>
    );
  }
}
export default Login;