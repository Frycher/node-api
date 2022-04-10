import UserModel from '../models/user.model.js';
import bcrypt from 'bcrypt';
import * as uuid from 'uuid';
import sendActivationMail from './mail.service.js';
import tokenService from './token.service.js';
import UserDto from '../dto/user.dto.js';

const register = async (email, password) => {
  const oldUser = await UserModel.findOne({
    email,
  });
  if (oldUser) {
    throw new Error(`User with this email exists ${email}`);
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const activationLink = uuid.v4();

  const user = await UserModel.create({
    email,
    password: hashPassword,
    activationLink,
  });
  await sendActivationMail(email, `${process.env.API_URL}/api/auth/activate/${activationLink}`);

  const userDto = new UserDto(user);
  const tokens = tokenService.generateToken({ ...userDto });
  await tokenService.saveToken(userDto.id, tokens.refreshToken);

  return {
    ...tokens,
    user: userDto,
  };
};

const activateUser = async (link) => {
  const user = await UserModel.findOne({ activationLink: link });
  if (!user) {
    throw new Error('Not correct link activation');
  }
  user.isActivated = true;
  await user.save();
};

export default {
  register,
  activateUser,
};
