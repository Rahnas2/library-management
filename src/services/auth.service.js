const userRepo = require('../repositories/user.repository');
const logger = require('../utils/logger');
const bcrypt = require('bcryptjs');

const { accessToken, refreshToken } = require('../utils/generateToken')

exports.registerUser = async ({ username, email, password }) => {
  const existing = await userRepo.findByEmail(email);
  if (existing) throw { status: 400, message: 'Email already registered' };

  const user = await userRepo.createUser({ username, email, password });
  const tokenAccess = accessToken(user);
  const tokenRefresh = refreshToken(user);

  logger.info(`User registered: ${user.email}`);
  return { accessToken: tokenAccess, refreshToken: tokenRefresh,  user: { id: user._id, username: user.username, email: user.email } };
};

exports.loginUser = async ({ email, password }) => {
  const user = await userRepo.findByEmail(email);
  if (!user) throw { status: 400, message: 'Invalid credentials' };

  const matched = await bcrypt.compare(password, user.password);
  if (!matched) throw { status: 400, message: 'Invalid credentials' };

  const tokenAccess = accessToken(user);
  const tokenRefresh = refreshToken(user);

  logger.info(`User login: ${user.email}`);
  return { accessToken: tokenAccess, refreshToken: tokenRefresh, user: { id: user._id, username: user.username, email: user.email } };
};

exports.logout = (req, res) => {
  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out successfully' });
};