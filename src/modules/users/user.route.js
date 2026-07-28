import express from "express";

import { signupValidation } from "../../utils/validators/authValidation.js";
import validationHandler from "../../middlewares/validationHandler.js";
import userController from "./users.controller.js";

const router = express.Router();

router
  .post("/signup", signupValidation, validationHandler, userController.signup)
  .post("/login", userController.login);

export default router;
