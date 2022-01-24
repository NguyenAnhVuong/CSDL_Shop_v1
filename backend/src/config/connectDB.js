import mysql from 'mysql2';
require('dotenv').config()
// create the connection to database
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    database: process.env.DB_NAME || 'csdl_shop',
    password: process.env.DB_PASS || 'Ban280401'
});
const query = (query, args = []) =>
  new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err);
      }
      connection.query(query, args, (err, results) => {
        connection.release();
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  });

module.exports = { query };