const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const AppError = require('../utils/appError');

exports.protect = async (req, res, next) => {
  // 1. Ambil token dari header
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('Kamu belum login. Silakan login terlebih dahulu.', 401)
    );
  }

  // 2. Verifikasi token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECURE);

  // 3. Cek apakah user masih ada
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError('User tidak ditemukan.', 401));
  }

  // 4. Simpan user ke req
  req.user = currentUser;
  next();
};
