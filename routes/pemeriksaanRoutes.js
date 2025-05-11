const express = require('express');
const router = express.Router();
const pemeriksaanController = require('../controller/pemeriksaanController');

router
  .route('/')
  .get(pemeriksaanController.getAllPemeriksaan)
  .post(pemeriksaanController.createPemeriksaan);
router.route('/:id').get(pemeriksaanController.getPemeriksaanById);
module.exports = router;
