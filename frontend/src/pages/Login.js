import React from "react";

import LoginHeader from './components/LoginHeader';
import LoginBody from "./components/LoginBody";
import LoginFooter from "./components/LoginFooter";

export default class Login extends React.Component {
  render() {

    return(
      <div>
        <LoginHeader />
        <LoginBody />
        <LoginFooter />
      </div>
    );
  }
}