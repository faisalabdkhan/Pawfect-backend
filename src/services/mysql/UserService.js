const mysqlConnection = require('../../config/connectDatabase');

class UserServiceMysql {
  async createUser(data) {
    const conn = await mysqlConnection();
    const { name, email, password } = data;

    const [result] = await conn.execute(
      'INSERT INTO users001 (name, email, password) VALUES (?, ?, ?)',
      [name, email, password]
    );
    await conn.end();
    return { id: result.insertId, ...data };
  }

  async getAllUsers() {
    const conn = await mysqlConnection();
    const [rows] = await conn.execute('SELECT * FROM users');
    await conn.end();
    return rows;
  }

  async getUserById(id) {
    const conn = await mysqlConnection();
    const [rows] = await conn.execute('SELECT * FROM users WHERE id = ?', [id]);
    await conn.end();
    return rows[0] || null;
  }

  async updateUser(id, data) {
    const conn = await mysqlConnection();
    const { name, email, password } = data;

    await conn.execute(
      'UPDATE users SET name = ?, email = ?, password = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [name, email, password, id]
    );

    const [updatedRows] = await conn.execute('SELECT * FROM users WHERE id = ?', [id]);
    await conn.end();
    return updatedRows[0] || null;
  }

  async deleteUser(id) {
    const conn = await mysqlConnection();
    const [result] = await conn.execute('DELETE FROM users WHERE id = ?', [id]);
    await conn.end();
    return result.affectedRows > 0;
  }
}

module.exports = new UserServiceMysql();
