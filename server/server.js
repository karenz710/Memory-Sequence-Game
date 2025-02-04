const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Fetch high scores
app.get("/api/highscores", (req, res) => {
  const query = "SELECT * FROM highscores ORDER BY level DESC, created_at ASC";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching high scores:", err);
      res.status(500).json({ success: false, message: "Failed to fetch high scores" });
      return;
    }
    res.json(results);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});