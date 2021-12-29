const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Profile } = require('../models/models');

const genereateJwt = (userId, userEmail, userRole) => {
  return jwt.sign({ userId, userEmail, userRole }, process.env.SECRET_KEY, {
    expiresIn: '24h',
  });
};

const UserController = {
  async registration(req, res, next) {
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
    const token = genereateJwt(user.userId, user.userEmail, user.userRole);
    return res.json(token);
  },
  async login(req, res, next) {
    const { userEmail, userPassword } = req.body;
    const user = await User.findOne({ where: { userEmail } });
    if (!user) {
      return next(ApiError.internal('User not found'));
    }
    const comparePassword = bcrypt.compareSync(userPassword, user.userPassword);
    if (!comparePassword) {
      return next(ApiError.internal('Incorrect password'));
    }
    const token = genereateJwt(user.userId, user.userEmail, user.userRole);
    return res.json(token);
  },
  async check(req, res, next) {
    const token = genereateJwt(
      req.user.userId,
      req.user.userEmail,
      req.user.userRole
    );
    return res.json(token);
  },
  async getAllUsers(req, res) {
    const users = await User.findAll();
    return res.json(users);
  },
  async getOneUser(req, res) {
    const { userId } = req.params;
    const user = await User.findOne({ where: { userId } });
    return res.json(user);
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
    const { userId } = req.params;
    const user = await User.destroy({ where: { userId } });
    return res.json(user);
  },
};

// обернуть все в трай кетч,
// обернуть все в трай кетч,
// обернуть все в трай кетч,
// обернуть все в трай кетч,
// обернуть все в трай кетч,

module.exports = UserController;
