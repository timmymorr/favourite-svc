const express = require('express');
const controller = require('./controllers/favourites');

const router = express.Router();

router.route('/favourite/:user_id/:id')
  .get(controller.getFavourite)
  .patch(controller.updateFavourite)
  .delete(controller.deleteFavourite)

router.route('/favourites/:user_id')
  .get(controller.getAll)
  .post(controller.addFavourite)

module.exports = router;