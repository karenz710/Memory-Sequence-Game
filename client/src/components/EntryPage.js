import React from "react";
import "../styles/EntryPage.css";

const EntryPage = ( {onStartGame} ) => {
    return (
        <div className="entry-page"> 
            <h1>Memory Sequence Game</h1>
            <button onClick={onStartGame}>Start</button>
        </div>
    );
}

export default EntryPage