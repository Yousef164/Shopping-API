import OrderService from "./order.service.js";

export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await OrderService.getAllOrders(req.user.id);
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const order = await OrderService.getOrderById(req.params.id);
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (req, res, next) => {
  try {
    const newOrder = await OrderService.createOrder(req.body);
    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
};

export const deleteOrder = async (req, res, next) => {
  try {
    const result = await OrderService.deleteOrder(req.params.id);
    res.status(204).json(result);
  } catch (error) {
    next(error);
  }
};

export default { getAllOrders, getOrderById, createOrder, deleteOrder };
