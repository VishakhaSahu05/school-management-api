require("dotenv").config();
const mysql = require("mysql2");

let connection;

if (process.env.DATABASE_URL) {
  // Render / Production
  const dbUrl = new URL(process.env.DATABASE_URL);

  connection = mysql.createConnection({
    host: dbUrl.hostname,
    user: dbUrl.username,
    password: dbUrl.password,
    database: dbUrl.pathname.replace("/", ""),
    port: dbUrl.port
  });

} else {
  // Local development
  connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
  });
}

connection.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    process.exit(1);
  }
  console.log("Database connection established");
});

module.exports = connection;