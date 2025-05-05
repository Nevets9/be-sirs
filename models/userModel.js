const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nama harus diisi!'],
  },
  email: {
    type: String,
    required: [true, 'Email harus diisi!'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Format email tidak valid!'],
  },
  role: {
    type: String,
    default: 'pasien',
    enum: ['dokter', 'pasien', 'admin'],
    required: [true, 'Role harus diisi!'],
  },
  password: {
    type: String,
    required: [true, 'Password harus diisi!'],
    minLength: 6,
    select: false,
  },
});

userSchema.pre('save', async function (next) {
  //run if password modified
  if (!this.isModified('password')) return next();

  //hasing pass with cost 12
  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
