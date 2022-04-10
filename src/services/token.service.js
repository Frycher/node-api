import jwt from 'jsonwebtoken';
import TokenModel from '../models/token.model.js';

const generateToken = (payload) => {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '7d' });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });

  return {
    accessToken,
    refreshToken,
  };
};

const saveToken = async (userId, refreshToken) => {
  const tokenData = await TokenModel.findOne({
    user: userId,
  });
  if (tokenData) {
    tokenData.refreshToken = refreshToken;
    return tokenData.save();
  }
  const token = await TokenModel.create({
    user: userId,
    refreshToken,
  });
  return token;
};

export default { generateToken, saveToken };
