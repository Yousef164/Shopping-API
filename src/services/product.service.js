const db = require("../models");

class productService {
  static async getAllProducts(page = 1, limit = 10) {
    try {
      page = parseInt(page);
      limit = parseInt(limit);
      const skip = (page - 1) * limit;
      const products = await db.Product.find().skip(skip).limit(limit);
      return products;
    } catch (error) {
      throw error;
    }
  }

  static async getProductById(id) {
    try {
      const product = await db.Product.findById(id);
      if (!product) {
        throw new Error("Product not found");
      }
      return product;
    } catch (error) {
      throw error;
    }
  }

  static async createProduct(data) {
    try {
      const newProduct = new db.Product(data);
      return await newProduct.save();
    } catch (error) {
      throw new Error("Product creation failed");
    }
  }

  static async updateProduct(id, data) {
    try {
      const updateProduct = await db.Product.updateOne({ _id: id }, data);
      if (updateProduct.nModified === 0) {
        throw new Error("Product not found or data is the same");
      }
      return updateProduct;
    } catch (error) {
      throw error;
    }
  }

  static async deleteProduct(id) {
    try {
      const deletedProduct = await db.Product.deleteOne({ _id: id });
      if (deletedProduct.deletedCount === 0) {
        throw new Error("Product not found");
      }
      return deletedProduct;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = productService;
