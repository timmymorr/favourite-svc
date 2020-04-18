const express = require('express');
const controller = require('./controllers/favourites');

const router = express.Router();

router.route('/favourite')
  .get(controller.getSingle)
  .post(controller.add)

router.route('/favourites')
  .get(controller.getAll)

module.exports = router;