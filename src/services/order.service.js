const { deleteOrder } = require("../controllers/order.controller");
const db = require("../models");

class OrderService {
  static async getAllOrders(userId) {
    try {
      return await db.Order.find({ userId });
    } catch (error) {
      throw error;
    }
  }

  static async getOrderById(orderId) {
    try {
      return await db.Order.findById(orderId);
    } catch (error) {
      throw error;
    }
  }

  static async createOrder(orderData) {
    try {
      const newOrder = await db.Order.create(orderData);
      return { message: "Order created successfully", order: newOrder };
    } catch (error) {
      throw error;
    }
  }

  static async deleteOrder(orderId) {
    try {
      await db.Order.findByIdAndDelete(orderId);
      return { message: "Order deleted successfully" };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = OrderService;
