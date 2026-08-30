const express = require("express");
const OrderController = require("../controllers/orderController");

const router = express.Router();

router.post("/orders", OrderController.createOrder);

module.exports = router;

