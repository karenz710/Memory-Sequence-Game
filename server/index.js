const mysql = require("mysql2");

import dotenv from 'dotenv'
dotenv.config()

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL!");
});

db.query("SELECT 1 + 1 AS solution", (err, results) => {
  if (err) throw err;
  console.log("The solution is:", results[0].solution);
});
