const express = require('express');
const router = express.Router();
const dokterController = require('../controller/dokterController');

router.route('/handlePasien').get(dokterController.getHandlePasien);

router
  .route('/')
  .get(dokterController.getAllDokters)
  .post(dokterController.createDokter);
router
  .route('/:id')
  .get(dokterController.getDokterById)
  .delete(dokterController.deleteDokter);

module.exports = router;
