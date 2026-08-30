const express = require("express");
const UserController = require("../controllers/userController");

const router = express.Router();

// Define routes
router.post("/auth/login", UserController.login); // LOGIN
router.post("/auth/register", UserController.createUser); // CREATE

module.exports = router;
