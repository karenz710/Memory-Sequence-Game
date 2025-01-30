import axios from 'axios';
import GameBoard from "./components/GameBoard";
import "./styles/index.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <GameBoard />
      </header>
    </div>
  );
}

export default App;
