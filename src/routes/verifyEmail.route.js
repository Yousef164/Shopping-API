const router = require("express").Router();

const verifyEmailController = require("../controllers/verifyEmail.controller");

router.get('/', verifyEmailController.verifyEmail);

module.exports = router
