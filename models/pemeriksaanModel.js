const mongoose = require('mongoose');

const pemeriksaanSchema = new mongoose.Schema({
  namaPasien: String,
  umurPasien: Number,
  namaDokter: String,
  analisa: String,
  resep: String,
});

module.exports = mongoose.model('Pemeriksaan', pemeriksaanSchema);
