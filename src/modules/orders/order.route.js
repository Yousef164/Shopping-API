import express from "express";

import orderController from "./order.controller.js";
import verifyToken from "../../middlewares/verifyToken.js";

const router = express.Router();

router
  .get("/", verifyToken, orderController.getAllOrders)
  .get("/:id", verifyToken, orderController.getOrderById)
  .post("/", verifyToken, orderController.createOrder)
  .delete("/:id", verifyToken, orderController.deleteOrder);

export default router;
