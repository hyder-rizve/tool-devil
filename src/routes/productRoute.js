const express = require("express");
const ProductController = require("../controllers/productController");

const router = express.Router();

router.get("/product", ProductController.getAllProducts);
router.get("/product/:id",ProductController.getByProductId);
router.get("/product/brand/:id",ProductController.getProductByBrandId);
router.get("/product/sub-category/:id",ProductController.getProductBySubCategoryId);
router.get("/product/slug/:slug",ProductController.getProductBySlug);


module.exports = router;
