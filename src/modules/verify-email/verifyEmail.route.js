import express from "express";

import verifyEmailController from "./verifyEmail.controller.js";

const router = express.Router();

router.get("/", verifyEmailController.verifyEmail);

export default router;
