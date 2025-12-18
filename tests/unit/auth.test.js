const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userService = require("../../src/services/user.service");
const db = require("../../src/models");
const { sendVerificationEmail } = require("../../src/utils/mailer");

jest.mock("../../src/models", () => ({
  User: {
    create: jest.fn(),
    findOne: jest.fn(),
  },
}));

jest.mock("../../src/utils/mailer", () => ({
  sendVerificationEmail: jest.fn(),
}));

jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("User Service Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("signup()", () => {
    it("should create user and send verification email", async () => {
      bcrypt.hash.mockResolvedValue("hashedPassword");
      crypto.randomBytes = jest.fn().mockReturnValue({
        toString: () => "emailToken123",
      });

      db.User.create.mockResolvedValue({
        id: 1,
        email: "test@test.com",
      });

      const result = await userService.signup({
        username: "test",
        email: "test@test.com",
        age: 20,
        password: "123456",
      });

      expect(bcrypt.hash).toHaveBeenCalledWith("123456", 10);
      expect(db.User.create).toHaveBeenCalled();
      expect(sendVerificationEmail).toHaveBeenCalled();
      expect(result.status).toBe(201);
    });
  });

  describe("login()", () => {
    it("should login user and return jwt token", async () => {
      db.User.findOne.mockResolvedValue({
        _id: "userId",
        email: "test@test.com",
        password: "hashedPassword",
        verifyEmail: true,
      });

      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue("jwt_token");

      const result = await userService.login({
        email: "test@test.com",
        password: "123456",
      });

      expect(db.User.findOne).toHaveBeenCalledWith({ email: "test@test.com" });
      expect(bcrypt.compare).toHaveBeenCalled();
      expect(jwt.sign).toHaveBeenCalled();
      expect(result.status).toBe(200);
      expect(result.token).toBe("jwt_token");
    });

    it("should throw error if user not verified", async () => {
      db.User.findOne.mockResolvedValue({
        verifyEmail: false,
      });

      await expect(
        userService.login({
          email: "test@test.com",
          password: "123456",
        })
      ).rejects.toEqual({
        status: 401,
        message: "This user is not exist",
      });
    });

    it("should throw error if password invalid", async () => {
      db.User.findOne.mockResolvedValue({
        password: "hashedPassword",
        verifyEmail: true,
      });

      bcrypt.compare.mockResolvedValue(false);

      await expect(
        userService.login({
          email: "test@test.com",
          password: "wrong",
        })
      ).rejects.toEqual({
        status: 401,
        message: "Invalid credentials",
      });
    });
  });
});
