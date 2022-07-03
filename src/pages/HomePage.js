import React from "react";

import HomePageHeader from './components/HomePageHeader';
import HomePageBody from "./components/HomePageBody";

import '../styling/GeneralStyling.css';
import '../styling/HomePageStyling.css';

export default class HomePage extends React.Component {
  render() {
    return(
      <div className="homepage-div">
        <HomePageHeader className="homepage-header" />
        <HomePageBody className="homepage-body" />
      </div>
    );
  }
}

  