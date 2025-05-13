const express = require('express');
const router = express.Router();
const janjiTemuController = require('../controller/janjiTemuController');

router
  .route('/')
  .get(janjiTemuController.getAllJanjiTemu)
  .post(janjiTemuController.createJanjiTemu);
router
  .route('/:id')
  .get(janjiTemuController.getJanjiTemuById)
  .delete(janjiTemuController.deleteJanjiTemu);

module.exports = router;
