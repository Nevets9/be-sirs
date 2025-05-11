const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECURE, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email sudah digunakan' });
    }

    const newUser = new User({
      email,
      password,
      role: 'pasien',
    });

    await newUser.save();

    const token = signToken(newUser._id);
    res.status(201).json({
      message: 'Pasien berhasil didaftarkan',
      token,
      pasien: {
        id: newUser._id,
        email: newUser.email,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Gagal register pasien', error: err.message });
  }
};

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //1. check email password
  if (!email || !password) {
    return next(new AppError('Akun tidak ditemukan', 400));
  }

  //2. check user exist and password correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  //3, everthing is ok, send token to client
  const token = signToken(user._id);

  user.password = undefined;
  user.email = undefined;
  user.role = undefined;

  res.status(200).json({
    message: 'Login berhasil',
    token,
    user,
  });
});
