const express = require('express');
const dokterController = require('../controller/dokterController');

const router = express.Router();

router
  .route('/')
  .get(dokterController.getAllDokter)
  .post(dokterController.createDokter);
router
  .route('/:id')
  .get(dokterController.getDokterById)
  .patch(dokterController.updateDokter)
  .delete(dokterController.deleteDokter);

module.exports = router;
