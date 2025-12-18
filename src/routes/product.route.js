const router = require("express").Router();

const productController = require("../controllers/product.controller");
const validationHandler = require("../middlewares/validationHandler");
const verifyToken = require("../middlewares/verifyToken");

router
  .get("/", verifyToken, productController.getAllProducts)
  .get("/:id", verifyToken, productController.getProductById)
  .post("/", verifyToken, productController.createProduct) 
  .put("/:id", verifyToken, productController.updateProduct)
  .delete("/:id", verifyToken, productController.deleteProduct);  

module.exports = router;
