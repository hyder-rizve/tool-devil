const express = require("express");
const ProductController = require("../controllers/productController");

const router = express.Router();

router.get("/product", ProductController.getAllProducts);
router.get("/product/:id",ProductController.getByProductId);

module.exports = router;
