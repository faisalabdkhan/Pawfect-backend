require('dotenv').config();
const mysql = require('mysql2/promise');

const mysqlConnection = async () => {
  const db = process.env.DB_CONNECTION;

  console.log('db', db);

  if (db === 'mysql') {
    try {
      const conn = await mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
      });

      console.log('✅ MySQL connected');
      return conn;
    } catch (err) {
      console.error('❌ MySQL connection failed:', err.message);
      return null; // ⛔️ Avoid process.exit
    }
  } else {
    console.error(`❌ Invalid DB_CONNECTION: ${db}`);
    return null; // ⛔️ Avoid process.exit
  }
};

module.exports = mysqlConnection;
