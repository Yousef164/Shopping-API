import userService from "./user.service.js";

export const signup = async (req, res, next) => {
  try {
    const result = await userService.signup(req.body);
    return res.status(result.status).json({ message: result.message });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const result = await userService.login(req.body);
    return res.status(result.status).json({ token: result.token });
  } catch (error) {
    next(error);
  }
};

export default { signup, login };
