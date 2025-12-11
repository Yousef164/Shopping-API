const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const db = require("../models");
const { jwtSecret } = require("../config/env");
const { sendVerificationEmail } = require("../utils/mailer");

class userService {
  static async signup(userData) {
    try {
      const { username, email, age, password } = userData;

      const hashedPassword = await bcrypt.hash(password, 10);
      const token = await crypto.randomBytes(32).toString("hex");
      const newUser = await db.User.create({
        username,
        email,
        age,
        password: hashedPassword,
        emailToken: token,
      });

      await sendVerificationEmail(email, username, token);

      return {
        status: 201,
        message:
          "User registered successfully. Please check your email to verify your account.",
      };
    } catch (error) {
      throw error;
    }
  }

  static async login(loginData) {
    try {
      const { email, password } = loginData;
      const user = await db.User.findOne({ email: email });

      if (user.verifyEmail === false || !user) {
        throw { status: 401, message: "This user is not exist" };
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw { status: 401, message: "Invalid credentials" };
      }

      const token = jwt.sign(
        { userId: user._id, email: user.email },
        jwtSecret,
        { expiresIn: "1h" }
      );

      return { status: 200, token: token };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = userService;
