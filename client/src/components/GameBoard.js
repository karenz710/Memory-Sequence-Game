import React, { useEffect, useState } from "react";
import "../styles/GameBoard.css";

const GameBoard = ({ gameStarted, onGameOver }) => {
  // setLitTile sets the litTile state to the index of the clicked tile
  const [litTile, setLitTile] = useState(null);
  // start at level 1
  const [level, setLevel] = useState(1);
  // memory for past sequences
  const[sequence, setSequence] = useState([]);
  // track player input
  const[playerInput, setPlayerInput] = useState([]);

  useEffect(() => {
    if (gameStarted) {
      // game state resets every time game starts,
      setLevel(1);
      setSequence([]);
      setPlayerInput([]);
      generateSequence();
    }
  }, [gameStarted]); // ONLY if gameStarted changes will this effect run again

  // Take the prev sequence and add a new random int from [0,9] then update it 
  const generateSequence = () => {
    const newSequence = [...sequence];
    newSequence.push(Math.floor(Math.random()*9));
    setSequence(newSequence)
    displaySequence(newSequence)
  };

  const displaySequence = (sequence) => {
    let i = 0;
    const interval = setInterval(() => {
      setLitTile(sequence[i]);
      setTimeout(() => setLitTile(null), 400); // each flashes 400 ms
      i++
      if (i >= sequence.length) {
        clearInterval(interval);
      }
    }, 1000) // 1 second btwn tiles
  };

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
