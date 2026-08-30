const bcrypt = require("bcryptjs");
const UserModel = require("../model/userModel");

class UserService {
  static async createUser(userData) {
    const { name, email, password, phone, role } = userData;

    if (!name || name.trim() === "") {
      const error = new Error("Name is required");
      error.status = 400;
      throw error;
    }

    if (!email || email.trim() === "") {
      const error = new Error("Email is required");
      error.status = 400;
      throw error;
    }

    if (!password) {
      const error = new Error("Password is required");
      error.status = 400;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await UserModel.create({
      name: name.trim(),
      email: email.trim(),
      password_hash: hashedPassword,
      phone: phone ? phone.trim() : null,
      role: role ? role.trim() : null,
    });

    return { id: userId };
  }

  static async loginUser(credentials) {
    const { email, password } = credentials || {};

    if (!email || email.trim() === "") {
      const error = new Error("Email is required");
      error.status = 400;
      throw error;
    }

    if (!password) {
      const error = new Error("Password is required");
      error.status = 400;
      throw error;
    }

    const user = await UserModel.findByEmail(email.trim());
    if (!user) {
      const error = new Error("Invalid email or password");
      error.status = 401;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      const error = new Error("Invalid email or password");
      error.status = 401;
      throw error;
    }

    const { password_hash, ...safeUser } = user;
    return safeUser;
  }

}
  module.exports = UserService;