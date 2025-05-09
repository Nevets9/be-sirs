const express = require('express');
const {
  notifikasiDaftar,
  notifikasiDokter,
} = require('../controller/notifikasiController');

const router = express.Router();

router.post('/daftar', notifikasiDaftar);
router.get('/dokter', notifikasiDokter);

module.exports = router;
