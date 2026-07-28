import { check } from "express-validator";

export const signupValidation = [
  check("username").notEmpty().withMessage("Username is required"),
  check("email").notEmpty().isEmail().withMessage("Valid email is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

export default signupValidation;
