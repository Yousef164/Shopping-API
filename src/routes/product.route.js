const router = require("express").Router();

const productController = require("../controllers/product.controller");
const validationHandler = require("../middlewares/validationHandler");
const verifyToken = require("../middlewares/verifyToken");

router
  .get("/", verifyToken, productController.getAllProducts) //ها نضيف الصفحات الي بتعرض كل المنتجات
  .get("/:id", verifyToken, productController.getProductById) //ها نضيف صفحة تعرض منتج معين بناء على الID
  .post("/", verifyToken, productController.createProduct) //ها نضيف صفحة لانشاء منتج جديد
  .put("/:id", verifyToken, productController.updateProduct) //ها نضيف صفحة لتحديث منتج معين بناء على الID
  .delete("/:id", verifyToken, productController.deleteProduct); //ها نضيف صفحة لحذف منتج معين بناء على الID

module.exports = router;
