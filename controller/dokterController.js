const Dokter = require('../models/dokterModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllDokter = catchAsync(async (req, res) => {
  const dokter = await Dokter.find().populate('user', 'name email');
  res.status(200).json({
    message: 'success',
    data: dokter,
  });
});

exports.createDokter = catchAsync(async (req, res) => {
  const newDokter = await Dokter.create({
    user: req.body.user,
    spesialisasi: req.body.spesialisasi,
    poli: req.body.poli,
  });

  res.status(201).json({
    message: 'Success',
    data: newDokter,
  });
});

exports.getDokterById = catchAsync(async (req, res) => {
  const dokter = await Dokter.findById(req.params.id);
  res.status(200).json({ data: dokter });
});

exports.updateDokter = catchAsync(async (req, res) => {
  const dokter = await Dokter.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ data: dokter });
});

exports.deleteDokter = catchAsync(async (req, res) => {
  await Dokter.findByIdAndDelete(req.params.id);
  res.status(204).json({ status: 'success', data: null });
});
