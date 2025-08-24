require('dotenv').config();
const connectMongo = require('./mongoConnection');
const connectMySQL = require('./mysqlConnection');

const connectDatabase = async () => {
  const db = process.env.DB_CONNECTION;

  console.log('db--', db);

  if (db === 'mongodb') {
    await connectMongo();
  } else if (db === 'mysql') {
    await connectMySQL();
  } else {
    console.error(`❌ Invalid DB_CONNECTION: ${db}`);
    process.exit(1);
  }
};

module.exports = connectDatabase;
