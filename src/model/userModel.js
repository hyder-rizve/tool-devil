const db = require("../config/db");

class UserModel {
  // Create a new user
  static async create(userData) {
    const { name, email, password_hash, phone, role } = userData;
    const query = `
            INSERT INTO user (name, email, password_hash, phone, role) 
            VALUES (?, ?, ?, ?, ?)
        `;
    const [result] = await db.execute(query, [
      name,
      email,
      password_hash,
      phone,
      role,
    ]);
    return result.insertId;
  }

  static async findByEmail(email) {
    const query =
      "SELECT id, name, email, password_hash, phone, role, created_at FROM user WHERE email = ?";
    const [rows] = await db.execute(query, [email]);
    return rows[0];
  }
  
}
  module.exports = UserModel;
