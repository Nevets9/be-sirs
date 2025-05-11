const User = require('../models/userModel');

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
    const { email, password, namaDokter, spesialisasi } = req.body;

    // Cek apakah user sudah ada
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email sudah terdaftar' });
    }

    const newUser = new User({
      email,
      password,
      role: 'dokter',
      dokterInfo: {
        namaDokter,
        spesialisasi,
      },
    });

    await newUser.save();

    res.status(201).json({
      message: 'Dokter berhasil didaftarkan',
      dokter: {
        id: newUser._id,
        email: newUser.email,
        namaDokter,
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
      namaDokter: user.dokterInfo.namaDokter,
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
