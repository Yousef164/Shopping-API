const jwt = require("jsonwebtoken");

const { jwtSecret } = require("../config/env");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];
  if (!token) {
    throw res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      throw res.status(401).json({ message: "Failed to authenticate token" });
    }
    return decoded;
  });
};

module.exports = verifyToken;
