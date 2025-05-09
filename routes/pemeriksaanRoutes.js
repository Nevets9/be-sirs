const express = require('express');
const router = express.Router();
const pemeriksaanController = require('../controller/pemeriksaanController');

router
  .route('/')
  .get(pemeriksaanController.getAllPemeriksaan)
  .post(pemeriksaanController.periksaPasien);
router
  .route('/:id')
  .get(pemeriksaanController.getPemeriksaanById)
  .patch(pemeriksaanController.updatePemeriksaan)
  .delete(pemeriksaanController.deletePemeriksaan);
module.exports = router;
