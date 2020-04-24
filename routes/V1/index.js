const tokenValidator = require('@timmymorr/token-validator');
const express = require('express');
const controller = require('./controllers/favourites');

const router = express.Router();

router.route('/favourite/:user_id/:id')
  .get(tokenValidator.validateToken, controller.getFavourite)
  .patch(tokenValidator.validateToken, controller.updateFavourite)
  .delete(tokenValidator.validateToken, controller.deleteFavourite)

router.route('/favourites/:user_id')
  .get(tokenValidator.validateToken, controller.getAll)
  .post(tokenValidator.validateToken, controller.addFavourite)

module.exports = router;