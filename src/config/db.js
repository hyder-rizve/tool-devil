const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

// Create connection pool (better for production)
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  timezone: '+05:00',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  dateStrings: true

});

// Promisify the pool for async/await
const promisePool = pool.promise();

module.exports = promisePool;
