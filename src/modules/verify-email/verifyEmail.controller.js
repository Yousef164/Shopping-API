import verifyEmailService from "./verifyEmail.service.js";

export const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.query;
    const result = await verifyEmailService.verifyEmail(token);
    return res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

export default { verifyEmail };
