const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const dokterSchema = new mongoose.Schema(
  {
    spesialisasi: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['pasien', 'dokter'],
    default: 'pasien',
  },
  dokterInfo: {
    type: dokterSchema,
    required: function () {
      return this.role === 'dokter';
    },
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
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
