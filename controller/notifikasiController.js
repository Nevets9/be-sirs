const catchAsync = require('../utils/catchAsync');
const JanjiTemu = require('../models/janjiTemuModel');
const User = require('../models/userModel');

exports.notifikasiPasien = catchAsync(async (req, res) => {
  const idPasien = req.params.id;

  const janjiTemuList = await JanjiTemu.find({ 'pasien.idPasien': idPasien })
    .select('pasien.namaPasien dokter.idDokter createdAt')
    .sort({ createdAt: 1 });

  // Tambahkan nomor antrian berdasarkan urutan
  const janjiTemuWithAntrian = janjiTemuList.map((janji, index) => ({
    ...janji.toObject(), // Convert mongoose document ke object
    nomorAntrian: index + 1,
  }));

  res.status(200).json({
    status: 'success',
    message: 'Daftar notifikasi janji temu pasien',
    data: janjiTemuWithAntrian,
  });
});

exports.notifikasiDokter = catchAsync(async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const besok = new Date(today);
  besok.setDate(besok.getDate() + 1);

  const janjiHariIni = await JanjiTemu.find({
    tanggal: { $gte: today, $lt: besok },
  });

  // Misalnya kamu simpan userId pasien sebagai `pasienId`
  const daftar = await Promise.all(
    janjiHariIni.map(async (j) => {
      const pasien = await User.findById(j.pasien);
      return {
        nama: pasien?.name || 'Tidak ditemukan',
        umur: j.umur,
      };
    })
  );

  res.status(200).json({
    status: 'success',
    data: daftar,
  });
});
