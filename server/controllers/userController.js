const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/models');

const genereateJwt = (userId, userEmail, userRole, userName) => {
  return jwt.sign(
    { userId, userEmail, userRole, userName },
    process.env.SECRET_KEY,
    {
      expiresIn: '31 days',
    }
  );
};

const UserController = {
  async registration(req, res, next) {
    try {
      const { userName, userEmail, userPassword, userRole } = req.body;
      if (!userName || !userEmail || !userPassword) {
        return next(ApiError.badRequest('Incorrect name, email or passsword'));
      }
      const candidate = await User.findOne({ where: { userEmail } });
      if (candidate) {
        return next(ApiError.badRequest('User with this email alredy exist'));
      }
      const hashPassword = await bcrypt.hash(userPassword, 5);
      const user = await User.create({
        userName,
        userEmail,
        userPassword: hashPassword,
        userRole,
      });
      const token = genereateJwt(
        user.userId,
        user.userEmail,
        user.userRole,
        user.userName
      );
      return res.json(token);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  },

  async login(req, res, next) {
    try {
      const { userEmail, userPassword } = req.body;
      const user = await User.findOne({ where: { userEmail } });
      if (!user) {
        return next(ApiError.internal('User not found'));
      }
      const comparePassword = bcrypt.compareSync(
        userPassword,
        user.userPassword
      );
      if (!comparePassword) {
        return next(ApiError.internal('Incorrect password'));
      }
      const token = genereateJwt(
        user.userId,
        user.userEmail,
        user.userRole,
        user.userName
      );
      return res.json(token);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  },

  async check(req, res, next) {
    try {
      const token = genereateJwt(
        req.user.userId,
        req.user.userEmail,
        req.user.userRole,
        req.user.userName
      );
      return res.json(token);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  },
  async getAllUsers(req, res) {
    try {
      const users = await User.findAll();
      return res.json(users);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  },
  async updateUser(req, res) {
    try {
      const { userName, userEmail, userRole } = req.body;
      const { userId } = req.params;
      await User.update(
        {
          userName,
          userEmail,
          userRole,
        },
        { where: { userId } }
      );
      const user = await User.findOne({ where: { userId } });
      return res.json(user);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  },
  async deleteUser(req, res) {
    try {
      const { userId } = req.params;
      const user = await User.destroy({ where: { userId } });
      return res.json(user);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  },
};

module.exports = UserController;
