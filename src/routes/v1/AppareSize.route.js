const express = require('express');
const lopController = require('../../controllers/AppareSize.controller');

const router = express.Router();

router
  .route('/')
  .post(AppareSize.Controller.createLop)
  .get(AppareSizeController.getLops);

router
  .route('/:lopId')
  .get(AppareSizeController.getLop)
  .patch(AppareSizeController.updateLop)
  .delete(AppareSizeController.deleteLop);

module.exports = router;

