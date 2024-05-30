const mysql = require("mysql2");
require("dotenv").config();
const { Pool } = require('pg');

// Create a new connection pool
const pool = new Pool({
 host: process.env.HOST,
 database:process.env.DATABASE,
 user:process.env.USER,
 password:process.env.PASSWORD,
//  connectionString:process.env.CONNECTION_STRING,
  // ssl: {
  //   rejectUnauthorized: false // Required for connections to Render.com PostgreSQL instances
  // }
});
class MySQLDatabase {
  constructor(config) {
    this.pool = mysql.createPool(config);
  }
  query(sql, args, callback) {
    this.pool.getConnection((err, connection) => {
      if (err) {
        console.error("Error getting connection from pool: " + err.stack);
        callback(err, null);
        return;
      }
      connection.query(sql, args, (err, results, fields) => {
        connection.release(); // Release the connection back to the pool
        if (err) {
          console.error("Error executing query: " + err.stack);
          callback(err, null);
          return;
        }
        callback(null, results, fields);
      });
    });
  }

  end() {
    this.pool.end((err) => {
      if (err) {
        console.error("Error ending pool: " + err.stack);
        return;
      }
      console.log("Pool ended");
    });
  }
}

const poolConfig = {
  connectionLimit: 10,
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};

// Create database instance
module.exports = new MySQLDatabase(poolConfig);
