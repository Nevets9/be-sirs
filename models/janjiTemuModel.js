const mongoose = require('mongoose');

const janjiTemuSchema = new mongoose.Schema({
  namaPasien: String,
  umurPasien: Number,
  dokter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dokter',
  },
  keluhan: String,
  tanggal: Date,
});

module.exports = mongoose.model('JanjiTemu', janjiTemuSchema);
