const OrderModel = require("../model/orderModel");

class OrderService {
  static async createOrder(orderData) {
    const {
      user_id,
      subtotal_ex_vat,
      vat_amount,
      total,
      currency,
      order_details
    } = orderData;

    if (!user_id || !subtotal_ex_vat || !vat_amount || !total || !currency || !order_details) {
      const error = new Error(
        "User ID, SubTotal , VatAmount, Total and Currency are required",
      );
      error.status = 400;
      throw error;
    }

    if (!Array.isArray(order_details) || order_details.length === 0) {
      const error = new Error("At least one product is required");
      error.status = 400;
      throw error;
    }

    const id = await OrderModel.create({
      user_id,
      subtotal_ex_vat,
      vat_amount,
      total,
      currency,
      order_details
    });

    return { id };
  }

}

module.exports = OrderService;