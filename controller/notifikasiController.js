const catchAsync = require('../utils/catchAsync');
const moment = require('moment');
const JanjiTemu = require('../models/janjiTemuModel');
const User = require('../models/userModel');

exports.notifikasiDaftar = catchAsync(async (req, res) => {
  const today = moment().startOf('day');
  const besok = moment().add(1, 'day').startOf('day');

  // Cari janji temu hari ini
  const janjiHariIni = await JanjiTemu.find({
    tanggal: { $gte: today.toDate(), $lt: besok.toDate() },
  });

  const nomorAntrian = janjiHariIni.length + 1;

  const pasien = await User.findById(req.body.userId);

  res.status(200).json({
    status: 'success',
    message: `Nomor antrian Anda adalah ${nomorAntrian}`,
    data: {
      nama: pasien.name,
      umur: req.body.umur,
      nomorAntrian,
    },
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
