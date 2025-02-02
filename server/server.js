const express = require("express"); // imports the Express.js framework -> build APIs
const cors = require("cors"); // imports the CORS (Cross-Origin Resource Sharing) middleware -> allow requests from different origins
const db = require("./db"); // import database

const app = express(); // create new instance of Express application
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// GET route (GETS data from database)
app.get("/api/highscores", async (req, res) => {
    try {
        const [rows] = await db.query(
            "SELECT * FROM highscores ORDER BY level DESC, created_at ASC"
        );
        res.json(rows);
    } catch (err) {
        console.error("Error fetching highscores:", err);
        res.status(500).json({ 
            success: false, 
            message: "Failed to fetch high scores"
        });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });