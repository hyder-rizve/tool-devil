const express = require("express");
const CategoryController = require("../controllers/categoryController");

const router = express.Router();

router.get("/category", CategoryController.getAllCategory);
router.get("/category/:id",CategoryController.getCategoryById);


module.exports = router;
