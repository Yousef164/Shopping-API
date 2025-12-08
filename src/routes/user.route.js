const router = require("express").Router();
const bcrypt = require("bcrypt");

const db = require("../models");
const { signupValidation } = require("../validators/authValidation");
const validationHandler = require("../middlewares/validationHandler");
const userController = require("../controllers/users.controller");

router
  .post("/signup", signupValidation, validationHandler, userController.signup)
  .post("/login", userController.login);

module.exports = router;
