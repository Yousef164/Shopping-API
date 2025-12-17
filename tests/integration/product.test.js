const db = require("../../src/models");
const productService = require("../../src/services/product.service");

jest.mock("../../src/models", () => ({
  Product: Object.assign(jest.fn(), {
    find: jest.fn(),
    findById: jest.fn(),
    deleteOne: jest.fn(),
    updateOne: jest.fn(),
  }),
}));

describe("Product Service Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllProducts", () => {
    it("should return paginated products", async () => {
      const mockProducts = [
        { id: 1, name: "Product 1", price: 100 },
        { id: 2, name: "Product 2", price: 200 },
      ];

      db.Product.find.mockReturnValue({
        skip: jest.fn().mockReturnValue({
          limit: jest.fn().mockResolvedValue(mockProducts),
        }),
      });

      const result = await productService.getAllProducts(1, 2);

      expect(db.Product.find).toHaveBeenCalled();
      expect(result.length).toBe(2);
      expect(result).toEqual(mockProducts);
    });
  });
  describe("getProductById", () => {
    it("should throw error if product not found", async () => {
      db.Product.findById.mockResolvedValue(null);

      await expect(productService.getProductById(1)).rejects.toThrow(
        "Product not found"
      );
    });
    it("if product found", async () => {
      const mockProduct = { id: 1, name: "Product 1", price: 100 };

      db.Product.findById.mockResolvedValue(mockProduct);

      const result = await productService.getProductById(1);

      expect(db.Product.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockProduct);
    });
  });

  describe("createProduct", () => {
    it("should create and return new product", async () => {
      const mockProductData = { name: "New Product", price: 150 };

      db.Product.mockImplementation(() => ({
        save: jest.fn().mockResolvedValue(mockProductData),
      }));

      const result = await productService.createProduct(mockProductData);

      expect(result).toEqual(mockProductData);
      expect(db.Product).toHaveBeenCalledWith(mockProductData);
    });

    it("should throw error if product creation fails", async () => {
      db.Product.mockImplementation(() => null);

      await expect(
        productService.createProduct({ name: "Faulty Product", price: 0 })
      ).rejects.toThrow("Product creation failed");
    });
  });

  describe("updateProduct", () => {
    it("should throw error if product not found or data is the same", async () => {
      db.Product.updateOne.mockResolvedValue({ nModified: 0 });

      await expect(
        productService.updateProduct(1, { name: "Updated Product" })
      ).rejects.toThrow("Product not found or data is the same");
    });

    it("should update and return the product", async () => {
      const mockUpdateResult = { nModified: 1 };

      db.Product.updateOne.mockResolvedValue(mockUpdateResult);

      const result = await productService.updateProduct(1, {
        name: "Updated Product",
      });

      expect(db.Product.updateOne).toHaveBeenCalledWith(
        { _id: 1 },
        { name: "Updated Product" }
      );
      expect(result).toEqual(mockUpdateResult);
    });
  });

  describe("deleteProduct", () => {
    it("should throw error if product not found", async () => {
      db.Product.deleteOne.mockResolvedValue({ deletedCount: 0 });

      await expect(productService.deleteProduct(1)).rejects.toThrow(
        "Product not found"
      );
    });

    it("should delete and return the product", async () => {
      const mockDeleteResult = { deletedCount: 1 };

      db.Product.deleteOne.mockResolvedValue(mockDeleteResult);

      const result = await productService.deleteProduct(1);

      expect(db.Product.deleteOne).toHaveBeenCalledWith({ _id: 1 });
      expect(result).toEqual(mockDeleteResult);
    });
  });
});
