import React, { useState } from "react";
import "../styles/GameBoard.css";

const GameBoard = () => {
  // setLitTile sets the litTile state to the index of the clicked tile
  const [litTile, setLitTile] = useState(null);
  // logic to start game
  
  // start at level 1
  const [level, setLevel] = useState(1);

  const handleTileClick = (index) => {
    setLitTile(index);
    setTimeout(() => setLitTile(null), 300); // Turns off after 300ms
  };

  return (
    // render 9 tiles
    <div className="game-board">
      
      {[...Array(9)].map((_, index) => ( // render a <div> for each tile using map (second param pos of current item)
        <div
          key={index}
          className={`tile ${litTile === index ? "lit" : ""}`} // every tile has tile class if litTile is index, adds the lit class
          onClick={() => handleTileClick(index)}
        ></div>
      ))}
    </div>
  );
};

export default GameBoard;
