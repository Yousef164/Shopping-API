import express from "express";

import productController from "./product.controller.js";
import verifyToken from "../../middlewares/verifyToken.js";

const router = express.Router();

router
  .get("/", verifyToken, productController.getAllProducts)
  .get("/:id", verifyToken, productController.getProductById)
  .post("/", verifyToken, productController.createProduct)
  .put("/:id", verifyToken, productController.updateProduct)
  .delete("/:id", verifyToken, productController.deleteProduct);

export default router;
