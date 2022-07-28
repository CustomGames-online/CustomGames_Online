import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import NoPage from "./pages/NoPage";
import GameLobby from "./pages/GameLobby";

import './styling/GeneralStyling.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends React.Component {
  render() {
    return (
        <BrowserRouter>
          <Routes>
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/gamelobby" element={<GameLobby />} />
            <Route path="/*" element={<NoPage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </BrowserRouter>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
