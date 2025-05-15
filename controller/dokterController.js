const User = require('../models/userModel');
const JanjiTemu = require('../models/janjiTemuModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllDokters = async (req, res) => {
  try {
    const dokterList = await User.find({ role: 'dokter' }).select('-password');
    res.status(200).json({ status: 'success', data: dokterList });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Gagal mengambil daftar dokter', error: err.message });
  }
};

exports.createDokter = async (req, res) => {
  try {
    const { email, password, nama, spesialisasi } = req.body;

    // Cek apakah user sudah ada
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email sudah terdaftar' });
    }

    const newUser = new User({
      email,
      nama,
      password,
      role: 'dokter',
      dokterInfo: {
        spesialisasi,
      },
    });

    await newUser.save();

    res.status(201).json({
      message: 'Dokter berhasil didaftarkan',
      dokter: {
        id: newUser._id,
        email: newUser.email,
        nama: newUser.nama,
        spesialisasi,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Gagal create dokter', error: err.message });
  }
};

// ✅ GET PROFILE DOKTER
exports.getDokterById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(403).json({ message: 'Tidak ditemukan' });
    }

    res.status(200).json({
      message: 'success',
      id: user._id,
      email: user.email,
      nama: user.nama,
      spesialisasi: user.dokterInfo.spesialisasi,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Gagal mengambil profil dokter', error: err.message });
  }
};

exports.deleteDokter = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await User.findOneAndDelete({ _id: id, role: 'dokter' });

    if (!deleted) {
      return res.status(404).json({ message: 'Dokter tidak ditemukan' });
    }

    res.status(200).json({ message: 'Akun dokter berhasil dihapus' });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Gagal menghapus dokter', error: err.message });
  }
};

exports.getHandlePasien = catchAsync(async (req, res) => {
  const now = new Date();

  // Geser waktu ke zona waktu WIB (UTC+7)
  const offsetMs = 7 * 60 * 60 * 1000; // 7 jam dalam milidetik
  const localNow = new Date(now.getTime() + offsetMs);

  // Hitung awal dan akhir hari lokal
  const startOfDay = new Date(localNow.getFullYear(), localNow.getMonth(), localNow.getDate());
  const endOfDay = new Date(localNow.getFullYear(), localNow.getMonth(), localNow.getDate(), 23, 59, 59, 999);

  // Kembalikan ke UTC agar sesuai dengan data di MongoDB (yang disimpan dalam UTC)
  const utcStart = new Date(startOfDay.getTime() - offsetMs);
  const utcEnd = new Date(endOfDay.getTime() - offsetMs);

  const pasienPerDokter = await JanjiTemu.aggregate([
    {
      $match: {
        tanggal: { $gte: utcStart, $lte: utcEnd },
      },
    },
    {
      $group: {
        _id: '$dokter.idDokter',
        jumlahPasien: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'dokterInfo',
      },
    },
    { $unwind: '$dokterInfo' },
    {
      $project: {
        dokterId: '$_id',
        namaDokter: '$dokterInfo.nama',
        spesialisasi: '$dokterInfo.dokterInfo.spesialisasi',
        jumlahPasien: 1,
        _id: 0,
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    message: 'Jumlah pasien per dokter hari ini',
    data: pasienPerDokter,
  });
});

