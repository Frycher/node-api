import authService from '../services/auth.service.js';

const login = async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userData = await authService.register(email, password);
    res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    return res.json(userData);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
  } catch (error) {}
};

const refresh = async (req, res, next) => {
  try {
  } catch (error) {}
};

const activate = async (req, res, next) => {
  try {
    const activationLink = req.params.link;
    await authService.activateUser(activationLink);
    return res.redirect(process.env.CLIENT_URL);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    res.send('hello');
  } catch (error) {
    console.log(error);
  }
};

export default {
  login,
  register,
  logout,
  refresh,
  activate,

  getUsers,
};
