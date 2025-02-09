const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Fetch high scores
app.get("/api/highscores", async(req, res) => {
  const query = "SELECT * FROM highscores ORDER BY level DESC, created_at ASC";

    try {
      const [results] = await db.promise().query(query)
      res.json(results)
    } catch (err) {
      console.error("Error fetching high scores:", err);
      res.status(500).json({ success: false, message: "Failed to fetch high scores" });
    }
});

// Add new H.S
app.post("/api/highscores", async (req, res) => {
  const { level } = req.body;
  const query = "INSERT INTO highscores (level, created_at) VALUES (?, NOW())"; // timestamp is NOW() function !
  
  try {
    const [result] = await db.promise().query(query, [level]);
    res.json({ success: true, id: result.insertId});
  } catch (err) {
    console.error("Error adding high score", err);
    res.status(500).json({ success: false, message: "Failed to add high score"});
  }
});

// Delete all entries from H.S board
app.delete("/api/highscores", async (req, res) => {
  const query = "TRUNCATE TABLE highscores";
  
  try{
    await db.promise().query(query);
    res.json({ success: true, message: "Highscores cleared"});
  } catch (err){
    console.error("Error clearing high scores", err);
    res.status(500).json({ success: false, message: "Failed to clear high scores"});
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});