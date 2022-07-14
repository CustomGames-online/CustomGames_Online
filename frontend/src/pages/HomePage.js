import React from "react";

import HomePageHeader from './components/HomePageHeader';
import HomePageBody from "./components/HomePageBody";
import HomePageFooter from './components/HomePageFooter';

export default class HomePage extends React.Component {
  render() {
    return(
      <div className="homepage-div">
        <HomePageHeader />
        <HomePageBody />
        <HomePageFooter />
      </div>
    );
  }
}

  