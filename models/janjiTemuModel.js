const mongoose = require('mongoose');

const janjiTemuSchema = new mongoose.Schema(
  {
    pasien: {
      idPasien: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      namaPasien: { type: String, required: true },
      nik: { type: String, required: true },
      umur: { type: Number, required: true },
      alamat: { type: String, required: true },
      noHp: { type: String, required: true },
    },
    dokter: {
      idDokter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      }, // Menghubungkan dengan model User (dokter)
    },
    keluhan: { type: String, required: true },
    tanggal: { type: Date, required: true }, // Tanggal janji temu
  },
  { timestamps: true }
);

module.exports = mongoose.model('JanjiTemu', janjiTemuSchema);
