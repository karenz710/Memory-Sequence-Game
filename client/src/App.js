import axios from 'axios';
import React, { useState } from "react";
import GameBoard from "./components/GameBoard";
import EntryPage from './components/EntryPage';
import HighScoreBoard from './components/HighScoreBoard';
import "./styles/index.css";


function App() {

  // entrance page pops up until start game is pressed
  const [gameStarted, setGameStarted] = useState(false);
  
  const handleStartGame = () => {
    setGameStarted(true);
  }

  const handleGameOver = () => {
    setGameStarted(false);
  };

  return (
    <div className="App">
      <div className="game-container">
        {!gameStarted ? (
          // when button on entrypage is clicked onStartGame executes and gamestarted is set to true
          <EntryPage onStartGame={handleStartGame} /> // passes in handleStartGame when game started
        ) : (
        <GameBoard gameStarted={gameStarted} onGameOver={handleGameOver} />
        )}
      </div>
      <div className="high-score-container">
        <HighScoreBoard />
      </div>
    </div>
  );
}

export default App;
