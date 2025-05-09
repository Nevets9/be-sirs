const Pemeriksaan = require('../models/pemeriksaanModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllPemeriksaan = catchAsync(async (req, res) => {
  const periksa = await Pemeriksaan.find();
  res.status(200).json({
    message: 'success',
    data: periksa,
  });
});

exports.periksaPasien = catchAsync(async (req, res) => {
  const periksa = await Pemeriksaan.create(req.body);
  res.status(201).json({
    message: 'Success',
    data: periksa,
  });
});

exports.getPemeriksaanById = catchAsync(async (req, res) => {
  const periksa = await Pemeriksaan.findById(req.params.id);
  res.status(200).json({ data: periksa });
});

exports.updatePemeriksaan = catchAsync(async (req, res) => {
  const periksa = await Pemeriksaan.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ data: periksa });
});

exports.deletePemeriksaan = catchAsync(async (req, res) => {
  await Pemeriksaan.findByIdAndDelete(req.params.id);
  res.status(204).json({ status: 'success', data: null });
});
