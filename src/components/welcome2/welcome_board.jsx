import React from "react";
import "./welcome_board2.css";
import welcome from './we3.png'

const WelcomeBoard2 = () => {
  return (
    <div className="welcome-board-container2">
      <div className="screw"></div>
      <div className="chain"></div>
      <img className="welcome-board2" src={welcome} style={{width:"100%"}} />
    </div>
  );
};

export default WelcomeBoard2;
