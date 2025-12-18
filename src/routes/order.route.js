const router = require("express").Router();

const orderController = require("../controllers/order.controller");
const verifyToken = require("../middlewares/verifyToken");

router
  .get("/", verifyToken, orderController.getAllOrders)
  .get("/:id", verifyToken, orderController.getOrderById)
  .post("/", verifyToken, orderController.createOrder)
  .delete("/:id", verifyToken, orderController.deleteOrder);