import { useEffect, useState } from "react";
import "../styles/HighScoreBoard.css";

const HighScoreBoard = ({ refreshTrigger }) => {
    const [highScores, setHighScores] = useState([]);

    useEffect(() => {
        fetchHighScores();
    }, [refreshTrigger]);

    const fetchHighScores = async () => {
        try{
            const response = await fetch("http://localhost:5000/api/highscores");
            const data = await response.json();
            console.log("Fetched high scores:", data); // Log the data
            setHighScores(data);
        }catch (error){
            console.error("Error fetching high scores: ", error);
        }
    };

    return (
        <div className = "high-score-board">
            <h2>All-Time High Score Board</h2>
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Level</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {highScores.map((score, index) => (
                        <tr key={score.id}>
                            <td>{index+1}</td>
                            <td>{score.level}</td>
                            <td>{new Date(score.created_at).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default HighScoreBoard;