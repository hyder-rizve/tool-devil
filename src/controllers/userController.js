const UserService = require("../services/userService");

class UserController {

    static async login(req, res) {
    try {
      const result = await UserService.loginUser(req.body);

      res.status(200).json({
        success: true,
        message: "Login successful",
        data: result,
      });
    } catch (error) {
      res.status(error.status || 500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  }
  static async createUser(req, res) {
    try {
      const result = await UserService.createUser(req.body);

      res.status(201).json({
        success: true,
        message: "User created successfully",
        data: result,
      });
    } catch (error) {
      res.status(error.status || 500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  }
}
  module.exports = UserController