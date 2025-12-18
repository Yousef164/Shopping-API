const orderService = require("../services/order.service");

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await orderService.getAllOrders(req.user.id);
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

exports.getOrderById = async (req, res, next) => {
  try {
    const order = await orderService.getOrderById(req.params.id);
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

exports.createOrder = async (req, res, next) => {
  try {
    const newOrder = await orderService.createOrder(req.body);
    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    const result = await orderService.deleteOrder(req.params.id);
    res.status(204).json(result);
  } catch (error) {
    next(error);
  }
};
