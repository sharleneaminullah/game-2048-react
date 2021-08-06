import React, { useState } from "react";
import {
  LEFT_ARROW_KEY,
  RIGHT_ARROW_KEY,
  DOWN_ARROW_KEY,
  UP_ARROW_KEY,
  LOWEST_KEY } from '../../constants/index';
import { cloneObject } from '../../gameLogic/helper';
import { useArrowKeyEvent } from '../../hooks';
import Tile from "../Tile/Tile";
import Cell from "../Cell/Cell";
import Button from "../Button/Button";
import Score from "../Score/Score";
import GameResult from "../GameResult/GameResult";
import { Board } from "../../gameLogic/Board/Board";
import { useSwipeable } from "react-swipeable";
import './gameboard.scss';


const GameBoard = () => {
  const [board, setBoard] = useState(new Board());

  const handleKeyDown = (event) => {
    if (board.hasWon()) {
      return;
    }
    if (event.keyCode === LEFT_ARROW_KEY || event.keyCode === DOWN_ARROW_KEY || 
      event.keyCode === RIGHT_ARROW_KEY ||  event.keyCode === UP_ARROW_KEY) {
        let directionNumber = event.keyCode - LOWEST_KEY; //will give 0 or 1 or 2 or 3
        let copyBoard = cloneObject(board);
        let newBoard = copyBoard.moveBoard(directionNumber);
        setBoard(newBoard);
    }
  };

  useArrowKeyEvent('keydown', handleKeyDown);

  const resetGame = () => {
    setBoard(new Board());
  };

  // Wrapper fucntion for handleKeyDown for Mobile touch
  const handleTouch = (key) => {
    handleKeyDown({keyCode:key})
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleTouch(LEFT_ARROW_KEY),
    onSwipedRight: () => handleTouch(RIGHT_ARROW_KEY),
    onSwipedUp: () => handleTouch(UP_ARROW_KEY),
    onSwipedDown: () => handleTouch(DOWN_ARROW_KEY),
  });

  const displayCells = board.cells.map((row, rowIndex) => {
    return (
      <div key={rowIndex}>
        {row.map((col, colIndex) => {
          return <Cell key={rowIndex + colIndex} />;
        })}
      </div>
    );
  });

  const displayTiles = board.tiles
    .filter((tile) => tile.value !== 0)
    .map((tile, index) => {
      return <Tile tile={tile} key={index} />;
    });

  return (
    <div>
      <div className="details-container">
        <Button className="resetButton" onClick={resetGame}>New Game</Button>
        <Score>{board.score}</Score>        
      </div>
      <div className="board" {...swipeHandlers}>
        {displayCells}
        {displayTiles}
        <GameResult onRestart={resetGame} board={board} />        
      </div>
    </div>
  );
};

export default GameBoard;
