const mysqlConnection = require('../../config/connectDatabase');

module.exports = {
  async up() {
    const conn = await mysqlConnection();
    if (!conn) {
      console.error('❌ Connection failed (conn is null or undefined)');
      return;
    }

    await conn.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255),
        password VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);

    console.log('✅ MySQL users table created');
  },

  async down() {
    const conn = await mysqlConnection();
    if (!conn) {
      console.error('❌ Connection failed (conn is null or undefined)');
      return;
    }

    await conn.query(`DROP TABLE IF EXISTS users`);
    console.log('❌ Dropped MySQL users table');
  }
};
