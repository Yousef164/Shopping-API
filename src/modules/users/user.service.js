import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import db from "../../models/index.js";
import { jwtSecret } from "../../config/env.js";
import { sendVerificationEmail } from "../../utils/mailer.js";

class UserService {
  static async signup(userData) {
    try {
      const { username, email, age, password } = userData;

      const hashedPassword = await bcrypt.hash(password, 10);
      const token = crypto.randomBytes(32).toString("hex");
      await db.User.create({
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
      const user = await db.User.findOne({ email });

      if (!user || user.verifyEmail === false) {
        throw { status: 401, message: "This user is not exist" };
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw { status: 401, message: "Invalid credentials" };
      }

      const token = jwt.sign({ id: user._id, email: user.email }, jwtSecret, {
        expiresIn: "1h",
      });

      return { status: 200, token };
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
