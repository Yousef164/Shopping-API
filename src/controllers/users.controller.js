const userService = require("../services/user.service");

exports.signup = async (req, res, next) => {
  try {
    const result = await userService.signup(req.body);
    return res.status(result.status).json({ message: result.message });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const result = await userService.login(req.body);
    return res.status(result.status).json({ token: result.token });
  } catch (error) {
    next(error);
  }
};
