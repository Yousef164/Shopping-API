const db = require("../models");

const verifyEmail = async (token) => {
  if (!token) {
    throw { status: 400, message: "Token is required" };
  }

  const user = await db.User.findOne({ emailToken: token });
  if (!user) {
    throw { status: 404, message: "Invalid or expired token" };
  }

  user.emailVerified = true;
  user.emailToken = null;
  await user.save();

  return "✅ Email verified successfully!";
};

module.exports = { verifyEmail };
