const productService = require("../services/product.service");

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await productService.getAllProducts(
      req.query.page,
      req.query.limit
    );
    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await productService.getProductById(req.params.id);
    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const newProduct = await productService.createProduct(req.body);
    return res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const updatedProduct = await productService.updateProduct(
      req.params.id,
      req.body
    );
    return res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const deletedProduct = await productService.deleteProduct(req.params.id);
    return res.status(200).json(deletedProduct);
  } catch (error) {
    next(error);
  }
};
