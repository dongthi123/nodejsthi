const express = require('express');
const thiiController = require('../../controllers/thii.controller');

const router = express.Router();

router
  .route('/')
  .post(thiiController.createThii)
  .get(thiiController.getThiis);

router
  .route('/:thiiId')
  .get(thiiController.getThii)
  .patch(thiiController.updateThii)
  .delete(thiiController.deleteThii);

module.exports = router;
