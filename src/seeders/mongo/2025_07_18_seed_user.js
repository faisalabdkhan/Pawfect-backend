const User = require('../../models/User');

module.exports = {
  async run() {
    const exists = await User.findOne({ email: 'amin@example.com' });
    if (!exists) {
      await User.create({
        name: 'amin',
        email: 'amin@example.com',
        password: '123456',
      });
      console.log('✅ Seeded MongoDB user: amin');
    } else {
      console.log('ℹ️ MongoDB user already exists');
    }
  }
};