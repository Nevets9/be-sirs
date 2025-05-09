const JanjiTemu = require('../models/janjiTemuModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllJanjiTemu = catchAsync(async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const janji = await JanjiTemu.find({
    tanggal: { $gte: today, $lt: tomorrow },
  });

  res.status(200).json({
    message: 'success',
    data: janji,
  });
});

exports.createJanjiTemu = catchAsync(async (req, res) => {
  const janji = await JanjiTemu.create(req.body);

  res.status(201).json({
    message: 'success',
    data: janji,
  });
});

exports.getJanjiTemuById = catchAsync(async (req, res) => {
  const janji = await JanjiTemu.findById(req.params.id);
  res.status(200).json({ data: janji });
});

exports.updateJanjiTemu = catchAsync(async (req, res) => {
  const janji = await JanjiTemu.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ data: janji });
});

exports.deleteJanjiTemu = catchAsync(async (req, res) => {
  await JanjiTemu.findByIdAndDelete(req.params.id);
  res.status(204).json({ status: 'success', data: null });
});
