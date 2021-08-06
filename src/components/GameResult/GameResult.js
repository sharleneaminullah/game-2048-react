import React from "react";
import TryAgain from "../../assets/img/try-again.gif";
import './gameresult.scss';

const GameResult = ({ onRestart, board }) => {
  if (board.hasWon()) {
    return (
      <div className="tile2048"></div>
    );
  } else if (board.hasLost()) {
    return (
      <div className="gameOver" onClick={onRestart}>
        <img src={TryAgain} 
              alt="Try Again" 
              style={{cursor: "pointer"}}/>
      </div>
    );
  }

  return null;
};

export default GameResult;
