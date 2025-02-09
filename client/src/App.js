import axios from "axios";
import React, { useState } from "react";
import GameBoard from "./components/GameBoard";
import EntryPage from "./components/EntryPage";
import HighScoreBoard from "./components/HighScoreBoard";
import "./styles/App.css";

function App() {
  // entrance page pops up until start game is pressed
  const [gameStarted, setGameStarted] = useState(false);
  // state for refreshing high score board
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleStartGame = () => {
    setGameStarted(true);
  };

  // save score logic or game over logic
  const handleGameOver = async (level) => {
    let message = ''
    if (level <= 5) {
      message = 'You can do better next time.'
    } else if (level <= 20) {
      message = 'Mediocre!'
    } else if (level <= 25) {
      message = 'Decent...'
    } else {
      message = 'Good job!'
    }

    const saveScore = window.confirm(`Game over!\n\nYou reached level ${level}. ${message}\n\n Save score?`);

    if (saveScore) {
      try {
        await axios.post('http://localhost:5000/api/highscores', {
          level: level,
        });
        alert('Score saved :)');
        setRefreshTrigger(prev => prev+1);
        setGameStarted(false);
      } catch (error) {
        console.error('Error saving score', error);
        setGameStarted(false);
      }
    } else {
      const playAgain = window.confirm('Play again?');
      if (playAgain) {
        setGameStarted(true);
      } else {
        setGameStarted(false);
      }
    }
  };

  return (
    <div className="app-container">
      {/* Main Game Section */}
      <div className="game-section">
        <div className="game-container">
          {!gameStarted ? (
            // when button on entrypage is clicked onStartGame executes and gamestarted is set to true
            <EntryPage onStartGame={handleStartGame} /> // passes in handleStartGame when game started
          ) : (
            <GameBoard gameStarted={gameStarted} onGameOver={handleGameOver} />
          )}
        </div>
      </div>
      {/* Fixed High Score Board on the Right */}
      <div className="high-score-section">
          <HighScoreBoard refreshTrigger={refreshTrigger}/>
      </div>
    </div>
  );
}

export default App;
