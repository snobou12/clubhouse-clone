const userService = require('../services/user-service');
const { validationResult } = require('express-validator');

class UserController {
  async postActivationCode(req, res, next) {
    try {
      const phone = req.body.phone;
      const userData = await userService.postActivationCode(phone);
      return res.json('Activation code has been sent');
    } catch (e) {
      next(e);
    }
  }
  async registration(req, res, next) {
    try {
      const { username, userImagePath, userPhone, activationCode } = req.body;
      const userData = await userService.registration(
        username,
        userImagePath,
        userPhone,
        activationCode,
      );
      return res.json('Registration completed successfully, check your enter-password on a phone');
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { phone, password } = req.body;
      const userData = await userService.login(phone, password);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;

      const userData = await userService.refresh(refreshToken);

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
