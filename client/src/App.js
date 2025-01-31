import axios from 'axios';
import React, { useState } from "react";
import GameBoard from "./components/GameBoard";
import EntryPage from './components/EntryPage';
import "./styles/index.css";

function App() {

  // entrance page pops up until start game is pressed
  const [gameStarted, setGameStarted] = useState(false);
  
  const handleStartGame = () => {
    setGameStarted(true);
  }

  return (
    <div className="App">
      <header className="App-header">
        {!gameStarted ? (
          <EntryPage onStartGame={handleStartGame} /> // passes in handleStartGame
        ) : (
        <GameBoard />
        )}
      </header>
    </div>
  );
}

export default App;
