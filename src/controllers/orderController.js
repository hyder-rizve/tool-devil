const OrderService = require("../services/orderService");

class OrderController {
  static async createOrder(req, res) {
    try {
      const result = await OrderService.createOrder(req.body);

      res.status(201).json({
        success: true,
        message: "Order created successfully",
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

module.exports = OrderController;