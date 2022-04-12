const ApiError = require('../errors/apiError');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

const generateToken = ({
  _id,
  username,
  email,
  role,
  birthday,
  createdDate,
}) => {
  return jwt.sign(
    {
      id: _id,
      username,
      email,
      role,
      birthday,
      createdDate,
    },
    SECRET_KEY,
    { expiresIn: '24h' }
  );
};

class AuthController {
  static async checkPassword(password, userPassword) {
    const comparePassword = await bcrypt.compare(password, userPassword);
    if (!comparePassword) {
      return next(ApiError.badRequest('Wrong password'));
    }
  }

  async login(req, res, next) {
    const { password, email } = req.body;

    if (!email) {
      return next(ApiError.badRequest(`Field 'email' is required`));
    } else if (!password) {
      return next(ApiError.badRequest(`Field 'password' is required`));
    }

    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        return next(ApiError.badRequest('User not found'));
      }

      AuthController.checkPassword(password, user.password)

      const token = generateToken(user);
      return res.json({ message: 'Success', jwt_token: token });
    } catch (err) {
      return next(ApiError.internal(`Server error`));
    }
  }

  async register(req, res, next) {
    const { username, password, email, role, birthday } = req.body;

    if (!username) {
      return next(ApiError.badRequest(`Field 'username' is required`));
    } else if (!password) {
      return next(ApiError.badRequest(`Field 'password' is required`));
    } else if (!email) {
      return next(ApiError.badRequest(`Field 'email' is required`));
    } else if (!role) {
      return next(ApiError.badRequest(`Field 'role' is required`));
    } else if (!birthday) {
      return next(ApiError.badRequest(`Field 'birthday' is required`));
    }

    try {
      const checkUser = await User.findOne({ email: email });

      if (checkUser) {
        return next(ApiError.badRequest(`User already exists`));
      }

      const passwordHash = await bcrypt.hash(password, 7);

      const user = new User({
        username,
        password: passwordHash,
        email,
        role,
        birthday,
        games: [],
      });
      await user.save();

      res.json({
        message: 'User created successfully!',
      });
    } catch (e) {
      return next(ApiError.internal(`Server error`));
    }
  }
}

module.exports = new AuthController();
