var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/User");

router.post("/signup", (req, res, next) => {
  User.find({ username: req.body.username })
    .then((user) => {
      if (user.length > 0) {
        return res.status(409).json({
          message: "Username already exists",
        });
      } else {
        bcrypt
          .hash(req.body.password, 10)
          .then((hash) => {
            const user = new User({
              username: req.body.username,
              password: hash,
            });
            return user.save();
          })
          .then((result) => {
            console.log(result);
            res.status(201).json({
              message: "User created successfully",
              userId: result._id,
            });
          })
          .catch((err) => {
            res.status(500).json({
              error: err.message || "An error occurred while creating the user",
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message || "An error occurred while checking the username",
      });
    });
});

router.post("/login", (req, res, next) => {
  User.find({ username: req.body.username })
    .then((user) => {
      if (user.length < 1) {
        res.status(401).json({
          message: "Authentication failed",
        });
      }
      bcrypt
        .compare(req.body.password, user[0].password)
        .then((result) => {
          if (result) {
            res.status(200).json({
              message: "Authentication successful",
              userId: user[0]._id,
            });
          } else {
            res.status(401).json({
              message: "Authentication failed",
            });
          }
        })
        .catch((err) => {
          res.status(500).json({
            error: err.message || "An error occurred during authentication",
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message || "An error occurred while retrieving the user",
      });
    });
});

router.patch("/update/:userId", (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const newuser = {
        username: req.body.username,
        password: hash,
      };
      User.findOneAndDelete({ _id: req.params.userId }, newuser)
        .then((result) => {
          if (result) {
            console.log(result);
            res.status(202).json({
              message: "User updated successfully",
              userId: req.params.userId,
            });
          } else {
            res.status(404).json({
              message: "User not found",
            });
          }
        })
        .catch((err) => {
          res.status(500).json({
            error: err.message || "An error occurred while updating the user",
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message || "An error occurred while hashing the password",
      });
    });
});

router.delete("/delete/:userId", (req, res, next) => {
  User.deleteOne({ _id: req.params.userId })
    .then((result) => {
      if (result) {
        res.status(200).json({
          message: "User deleted successfully",
          userId: req.params.userId,
        });
      } else {
        res.status(404).json({
          message: "User not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message || "An error occurred while deleting the user",
      });
    });
});

module.exports = router;
