const express = require("express");
const Sub_CategoryController = require("../controllers/sub_categoryController");

const router = express.Router();

router.get("/sub_category", Sub_CategoryController.getAllSub_Category);
router.get("/sub_category/:id",Sub_CategoryController.getsub_categoryById);
router.get("/sub_category/sub/:parent_id",Sub_CategoryController.getsub_categoryByParentId);


module.exports = router;
