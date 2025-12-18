const { jwtSecret } = require("../../src/config/env");
const db = require("../../src/models");
const orderService = require("../../src/services/order.service");

jest.mock("../../src/models", () => ({
  Order: Object.assign(jest.fn(), {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndDelete: jest.fn(),
  }),
}));

describe("Order Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllOrders", () => {
    it("should return all orders for a user", async () => {
      const mockOrders = [
        {
          _id: "order1",
          userId: "user1",
          items: [
            { productId: "prod1", quantity: 2 },
            { productId: "prod2", quantity: 1 },
          ],
        },
        {
          _id: "order2",
          userId: "user1",
          items: [
            { productId: "prod3", quantity: 4 },
            { productId: "prod4", quantity: 2 },
          ],
        },
      ];

      db.Order.find.mockResolvedValue(mockOrders);

      const orders = await orderService.getAllOrders("user1");

      expect(db.Order.find).toHaveBeenCalledWith({ userId: "user1" });
      expect(orders).toEqual(mockOrders);
    }),
      it("should throw an error if database call fails", async () => {
        db.Order.find.mockRejectedValue(new Error("Database error"));

        await expect(orderService.getAllOrders("user1")).rejects.toThrow(
          "Database error"
        );
      });
  });

  describe("createOrder", () => {
    it("should create a new order", async () => {
      const orderData = {
        userId: "user1",
        items: [
          { productId: "prod1", quantity: 2 },
          { productId: "prod2", quantity: 1 },
        ],
      };

      const mockOrder = {
        _id: "order1",
        ...orderData,
      };

      db.Order.mockImplementation(() => ({
        save: jest.fn().mockResolvedValue(mockOrder),
      }));

      const result = await orderService.createOrder(orderData);

      expect(result).toEqual({
        message: "Order created successfully",
        order: mockOrder,
      });
    });

    it("should throw an error if order creation fails", async () => {
      const orderData = {
        userId: "user1",
        items: [
          { productId: "prod1", quantity: 2 },
          { productId: "prod2", quantity: 1 },
        ],
      };

      db.Order.mockImplementation(() => ({
        save: jest.fn().mockRejectedValue(new Error("Creation failed")),
      }));

      await expect(orderService.createOrder(orderData)).rejects.toThrow(
        "Creation failed"
      );
    });
  });

  describe("deleteOrder", () => {
    it("should delete an order by ID", async () => {
      db.Order.findByIdAndDelete.mockResolvedValue({});

      const result = await orderService.deleteOrder("order1");

      expect(db.Order.findByIdAndDelete).toHaveBeenCalledWith("order1");
      expect(result).toEqual({ message: "Order deleted successfully" });
    });

    it("should throw an error if deletion fails", async () => {
      db.Order.findByIdAndDelete.mockRejectedValue(
        new Error("Deletion failed")
      );

      await expect(orderService.deleteOrder("order1")).rejects.toThrow(
        "Deletion failed"
      );
    });
  });
});
