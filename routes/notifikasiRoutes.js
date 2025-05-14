const express = require('express');
const {
  notifikasiPasien,
  notifikasiDokter,
} = require('../controller/notifikasiController');

const router = express.Router();

router.get('/pasien/:id', notifikasiPasien);
router.get('/dokter', notifikasiDokter);

module.exports = router;
