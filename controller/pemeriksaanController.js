const Pemeriksaan = require('../models/pemeriksaanModel');
const JanjiTemu = require('../models/janjiTemuModel');

// Create pemeriksaan
exports.createPemeriksaan = async (req, res) => {
  try {
    const { janjiTemu, analisa, resepObat } = req.body;

    // Pastikan janji temu tersedia
    const janji = await JanjiTemu.findById(janjiTemu);
    if (!janji) {
      return res.status(404).json({ message: 'Janji temu tidak ditemukan' });
    }

    const pemeriksaanBaru = new Pemeriksaan({
      janjiTemu,
      analisa,
      resepObat,
    });

    await pemeriksaanBaru.save();

    res.status(201).json({
      message: 'Pemeriksaan berhasil dibuat',
      data: pemeriksaanBaru,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Gagal membuat pemeriksaan',
      error: err.message,
    });
  }
};

// Get all pemeriksaan
exports.getAllPemeriksaan = async (req, res) => {
  try {
    const data = await Pemeriksaan.find().populate('janjiTemu');
    res.status(200).json({ message: 'Success', data });
  } catch (err) {
    res.status(500).json({
      message: 'Gagal mengambil daftar pemeriksaan',
      error: err.message,
    });
  }
};

// Get pemeriksaan by ID
exports.getPemeriksaanById = async (req, res) => {
  try {
    const { id } = req.params;
    const pemeriksaan = await Pemeriksaan.findById(id).populate('janjiTemu');

    if (!pemeriksaan) {
      return res.status(404).json({ message: 'Pemeriksaan tidak ditemukan' });
    }

    res.status(200).json({ message: 'Success', data: pemeriksaan });
  } catch (err) {
    res.status(500).json({
      message: 'Gagal mengambil detail pemeriksaan',
      error: err.message,
    });
  }
};
