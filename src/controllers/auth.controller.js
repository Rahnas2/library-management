const authService = require('../services/auth.service');

exports.register = async (req, res, next) => {
  try {
    const {accessToken, refreshToken, user} = await authService.registerUser(req.body);

     res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({accessToken, user});
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const {accessToken, refreshToken, user} = await authService.loginUser(req.body);

     res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({accessToken, user});;
  } catch (err) {
    next(err);
  }
};