const verifyEmailService = require("../services/verifyEmail.service");

exports.verifyEmail = async (req, res, next) => {
    try {
        const { token } = req.query;
        const result = await verifyEmailService.verifyEmail(token);
        return res.status(200).send(result);
    } catch (error) {
        next(error);
    }
}