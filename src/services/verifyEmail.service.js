const verifyEmail = async (token) => {
  try {
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

    return res.send("✅ Email verified successfully!");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Something went wrong");
  }
};

module.exports = { verifyEmail };
