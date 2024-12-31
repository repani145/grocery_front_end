import React from "react";
import "./welcome_board.css";

const WelcomeBoard = () => {
  return (
    <div className="welcome-board-container" style={{height:"350px"}}>
      <div className="screw"></div>
      <div className="chain"></div>
      <div className="welcome-board">
        <h2>Welcome to Gully Grocery!</h2>
        <p>Your one-stop shop for amazing deals</p>
      </div>
    </div>
  );
};

export default WelcomeBoard;
