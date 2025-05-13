const mongoose = require('mongoose');

const pemeriksaanSchema = new mongoose.Schema(
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
      }, 
    },
    keluhan: { type: String, required: true },
    tanggal: { type: Date, required: true },
    analisa: {
      type: String,
      required: true,
    },
    resepObat: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Pemeriksaan = mongoose.model('Pemeriksaan', pemeriksaanSchema);
module.exports = Pemeriksaan;
