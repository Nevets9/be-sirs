const mongoose = require('mongoose');

const pemeriksaanSchema = new mongoose.Schema(
  {
    janjiTemu: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'JanjiTemu',
      required: true,
    },
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
