const Pemeriksaan = require('../models/pemeriksaanModel');
const User = require('../models/userModel');

// Create pemeriksaan
exports.createPemeriksaan = async (req, res) => {
  try {
    const {
      idPasien,
      namaPasien,
      nik,
      umur,
      alamat,
      noHp,
      idDokter,
      keluhan,
      tanggal,
      analisa,
      resepObat,
    } = req.body;

    const pasien = await User.findById(idPasien);
    const dokter = await User.findById(idDokter);

    if (!pasien || pasien.role !== 'pasien') {
      return res.status(404).json({ message: 'Pasien tidak ditemukan' });
    }

    if (!dokter || dokter.role !== 'dokter') {
      return res.status(404).json({ message: 'Dokter tidak ditemukan' });
    }

    const pemeriksaanBaru = new Pemeriksaan({
      pasien: {
        idPasien,
        namaPasien,
        nik,
        umur,
        alamat,
        noHp,
      },
      dokter: {
        idDokter,
      },
      keluhan,
      tanggal,
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
    const data = await Pemeriksaan.find().sort({ tanggal: 1 });
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
