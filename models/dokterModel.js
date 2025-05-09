const mongoose = require('mongoose');

const dokterSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    spesialisasi: {
      type: String,
      required: true,
    },
    poli: {
      type: String,
      required: true,
    },
  });
  
  module.exports = mongoose.model('Dokter', dokterSchema);