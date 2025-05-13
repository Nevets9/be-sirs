const JanjiTemu = require('../models/janjiTemuModel');
const User = require('../models/userModel');

exports.getAllJanjiTemu = async (req, res) => {
  try {
    const janjiTemu = await JanjiTemu.find()
      .populate('pasien.idPasien', 'nama email') // Populate data pasien
      .populate('dokter.idDokter', 'namaDokter spesialisasi') // Populate data dokter
      .select('-__v'); // Menghindari field __v yang digunakan untuk versioning di MongoDB

    res.status(200).json({
      status: 'success',
      result: janjiTemu.length,
      data: janjiTemu,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Gagal mengambil daftar janji temu',
      error: err.message,
    });
  }
};

exports.createJanjiTemu = async (req, res) => {
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
    } = req.body;

    // Validasi apakah pasien dan dokter ada
    const pasien = await User.findById(idPasien);
    const dokter = await User.findById(idDokter);

    if (!pasien || pasien.role !== 'pasien') {
      return res.status(404).json({ message: 'Pasien tidak ditemukan' });
    }

    if (!dokter || dokter.role !== 'dokter') {
      return res.status(404).json({ message: 'Dokter tidak ditemukan' });
    }

    const newJanjiTemu = new JanjiTemu({
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
    });

    await newJanjiTemu.save();

    res.status(201).json({
      message: 'Janji temu berhasil dibuat',
      data: newJanjiTemu,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Gagal membuat janji temu', error: err.message });
  }
};

exports.getJanjiTemuById = async (req, res) => {
  try {
    const { id } = req.params; // Ambil ID dari parameter URL

    const janjiTemu = await JanjiTemu.findById(id)
      .populate('pasien.idPasien', 'nama email') // Populate data pasien
      .populate('dokter.idDokter', 'namaDokter spesialisasi') // Populate data dokter
      .select('-__v'); // Menghindari field __v yang digunakan untuk versioning di MongoDB

    if (!janjiTemu) {
      return res.status(404).json({ message: 'Janji temu tidak ditemukan' });
    }

    res.status(200).json({
      status: 'success',
      data: janjiTemu,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Gagal mengambil janji temu',
      error: err.message,
    });
  }
};

exports.deleteJanjiTemu = catchAsync(async (req, res) => {
  const deleteJanjiTemu = await JanjiTemu.findOneAndDelete(req.params.id);

  if (!deleteJanjiTemu) {
    return res.status(404).json({ message: 'Janji Temu tidak ditemukan' });
  }

  res.status(200).json({ message: 'Janji Temu berhasil dihapus' });
});
