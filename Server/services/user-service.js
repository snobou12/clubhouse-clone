const UserModel = require('../models/user-model');
const bcrypt = require('bcryptjs');
const axios = require('axios');
const ApiError = require('../exceptions/api-errors');
const UserDto = require('../dtos/user-dto');
const tokenService = require('./token-service');

const genPassword = (len) => {
  var password = '';
  var symbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!№;%:?*()_+=';
  for (var i = 0; i < len; i++) {
    password += symbols.charAt(Math.floor(Math.random() * symbols.length));
  }
  return password;
};

const shuffle = (o) => {
  for (
    var j, x, i = o.length;
    i;
    j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
  );
  return o;
};

const random4Digit = () => {
  return shuffle('0123456789'.split('')).join('').substring(0, 4);
};

const sendActivationCodeOnPhone = async (phone, code) => {
  await axios.post(
    `https://sms.ru/sms/send?api_id=2251289C-DEE0-6CFA-8CB1-9CB51CA83404&to=${phone}&msg=${code}&json=1`,
  );
};

const sendEnterPasswordOnPhone = async (phone, password) => {
  await axios.post(
    `https://sms.ru/sms/send?api_id=2251289C-DEE0-6CFA-8CB1-9CB51CA83404&to=${phone}&msg=${password}&json=1`,
  );
};

class UserService {
  async postActivationCode(phone) {
    const candidate = await UserModel.findOne({ phone });
    if (candidate) {
      if (candidate.isActivated) {
        throw ApiError.BadRequest(`User with this phone ${phone} already exists`);
      }
    }
    const activationCode = random4Digit();
    console.log(activationCode);
    if (candidate) {
      candidate.activationCode = activationCode;
      await candidate.save();
    } else {
      sendActivationCodeOnPhone(phone, activationCode);
      const user = await UserModel.create({
        username: ' ',
        userImagePath: ' ',
        password: ' ',
        phone,
        activationCode,
        isActivated: false,
      });
    }
  }

  async registration(username, userImagePath, phone, activationCode) {
    const user = await UserModel.findOne({ phone, activationCode });
    if (!user) {
      throw ApiError.BadRequest(`Invalid activation code`);
    }

    const password = genPassword(12);
    const hashPassword = await bcrypt.hash(password, 3);
    console.log(password);

    sendEnterPasswordOnPhone(phone, password);

    user.username = username;
    user.userImagePath = userImagePath;
    user.password = hashPassword;
    user.activationCode = ' ';
    user.isActivated = true;
    user.save();
  }

  async login(phone, password) {
    const user = await UserModel.findOne({ phone });
    if (!user) {
      throw ApiError.BadRequest(`User with this phone ${phone} does not exist`);
    }
    const isPassEqualas = await bcrypt.compare(password, user.password);
    if (!isPassEqualas) {
      throw ApiError.BadRequest(`Wrong password, please try again`);
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.BadRequest('User is not authorization');
    }

    const userData = tokenService.validateRefreshToken(refreshToken);

    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw ApiError.BadRequest('User is not authorization');
    }

    const user = await UserModel.findById(userData.id);

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }
}

module.exports = new UserService();
