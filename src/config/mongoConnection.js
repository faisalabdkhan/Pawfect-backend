require('dotenv').config();
const mongoose = require('mongoose');

const connectMongo = async () => {
  const db = process.env.DB_CONNECTION;

  if (db === 'mongodb') {
    try {
      await mongoose.connect(process.env.MONGO_URI);

      console.log('✅ MongoDB connected');
    } catch (err) {
      console.error('❌ MongoDB connection failed:', err.message);
      process.exit(1);
    }
  } else {
    console.error(`❌ Invalid DB_CONNECTION for MongoDB: ${db}`);
    process.exit(1);
  }
};

module.exports = connectMongo;
