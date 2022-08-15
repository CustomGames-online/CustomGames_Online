/* eslint-disable */

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App'
// import GameLobby from "./pages/GameLobby";
// import HomePage from "./pages/HomePage";
// import Profile from "./pages/Profile";
// import Login from "./pages/Login";
// import NoPage from "./pages/NoPage";
// import HomePageHeader from "./pages/components/HomePageHeader";



import './styling/GeneralStyling.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const Router = () => (
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<App />} />
            <Route exact path="/:gameType/:id" element={<App />} />
        </Routes>
    </BrowserRouter>
)

// const App = () => {
//     return <App />
//   // return (
//   //     <BrowserRouter>
//   //       <HomePageHeader />
//   //       <Routes>
//   //         <Route path="/profile" element={<Profile />} />
//   //         <Route path="/login" element={<Login />} />
//   //         <Route path="/gamelobby" element={<GameLobby />} />
//   //         <Route path="/*" element={<NoPage />} />
//   //         <Route path="/" element={<HomePage />} />
//   //       </Routes>
//   //     </BrowserRouter>
//   // );
//
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Router />);
