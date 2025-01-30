import React, { useState } from "react";
import "../styles/GameBoard.css";

const GameBoard = () => {
  // Lit tile logic
  const [litTile, setLitTile] = useState(null);

  const handleTileClick = (index) => {
    setLitTile(index);
    setTimeout(() => setLitTile(null), 300); // Turns off after 300ms
  };

  return (
    // render 9 tiles
    <div className="game-board">
      {[...Array(9)].map((_, index) => (
        <div
          key={index}
          className={`tile ${litTile === index ? "lit" : ""}`} // adds tile + lit class 
          onClick={() => handleTileClick(index)}
        ></div>
      ))}
    </div>
  );
};

export default GameBoard;
