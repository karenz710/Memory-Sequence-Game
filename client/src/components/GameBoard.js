import React, { useEffect, useState } from "react";
import "../styles/GameBoard.css";

const GameBoard = ({ gameStarted, onGameOver }) => {
  // setLitTile sets the litTile state to the index of the clicked tile
  const [litTile, setLitTile] = useState(null);
  // start at level 1
  const [level, setLevel] = useState(1);
  // memory for past sequences
  const [sequence, setSequence] = useState([]);
  // track player input
  const [playerInput, setPlayerInput] = useState([]);
  // for use to ensure players cannot light tiles while sequence is displaying
  const [isDisplayingSequence, setIsDisplayingSequence] = useState(false);

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
    newSequence.push(Math.floor(Math.random() * 9));
    setSequence(newSequence);
    displaySequence(newSequence);
  };

  const displaySequence = (sequence) => {
    setIsDisplayingSequence(true);
    let i = 0;
    const interval = setInterval(() => {
      setLitTile(sequence[i]);
      setTimeout(() => setLitTile(null), 300); // each flashes 400 ms
      i++;
      if (i >= sequence.length) {
        clearInterval(interval); // stop interval from running
        setIsDisplayingSequence(false);
      }
    }, 600); // 1 second btwn tiles
  };

  const handleTileClick = (index) => {
    if (isDisplayingSequence) return; // ignore clicks while seq is displaying

    const newInput = ([...playerInput, index]); // add clicked tile to player's input
    setPlayerInput(newInput)

    setLitTile(index);
    setTimeout(() => setLitTile(null), 200); // Turns off after 500ms

    checkSequence(newInput); // check if the new input matches; compare to org seq
  };

  const checkSequence = (input) => {
    // check if the last clicked tile matches the corresponding tile in the seq
    if (input[input.length-1] !== sequence[input.length-1]){
      // game over
      alert("Game Over!");
      onGameOver();
    } else if (input.length === sequence.length){ // entire sequence is correct
      setLevel(level+1)
      setPlayerInput([]);
      generateSequence(); // generate next seq (+1 random tile)
    } 
  };

  return (
    <div>
      <h2>Level: {level}</h2>
      {/*render 9 tiles*/} 
      <div className="game-board">
        {[...Array(9)].map(
          (
            _,
            index // render a <div> for each tile using map (second param pos of current item)
          ) => (
            <div
              key={index}
              className={`tile ${litTile === index ? "lit" : ""}`} // every tile has tile class if litTile is index, adds the lit class
              onClick={() => handleTileClick(index)}
            ></div>
          )
        )}
      </div>
    </div>
  );
};

export default GameBoard;
