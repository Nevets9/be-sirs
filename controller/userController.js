const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const pasienList = await User.find().select('-password');
  res.status(200).json({
    status: 'success',
    data: pasienList,
  });
});

exports.getUserById = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id);

  user.password = undefined;
  res.status(200).json({
    status: 'success',
    data: user,
  });
});

exports.deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const deletedUser = await User.findOneAndDelete({ _id: id, role: 'pasien' });

  if (!deletedUser) {
    return res.status(404).json({ message: 'Akun tidak ditemukan' });
  }

  res.status(200).json({ message: 'Akun pasien berhasil dihapus' });
});
