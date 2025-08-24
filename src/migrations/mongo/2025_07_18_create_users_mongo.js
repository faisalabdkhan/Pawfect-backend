const mongoose = require('mongoose');

module.exports = {
  async up() {
    console.log('✅ MongoDB User collection ready (via Mongoose model).');
  },
  async down() {
    await mongoose.connection.collection('users').drop();
    console.log('❌ Dropped MongoDB users collection');
  }
};