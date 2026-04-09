require("dotenv").config();
const mysql = require("mysql2/promise");

let pool;

if (process.env.DATABASE_URL) {
  // Production (Render)
  const dbUrl = new URL(process.env.DATABASE_URL);

  pool = mysql.createPool({
    host: dbUrl.hostname,
    user: dbUrl.username,
    password: dbUrl.password,
    database: dbUrl.pathname.replace("/", ""),
    port: dbUrl.port,
    waitForConnections: true,
    connectionLimit: 10,
  });

} else {
  // Local
  pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
  });
}

// IMPORTANT — test connection
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Database connection established");
    connection.release();
  } catch (err) {
    console.error("Database connection failed:", err);
  }
})();

module.exports = pool;