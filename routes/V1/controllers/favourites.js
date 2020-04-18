const mongoose = require('mongoose');
const Favourite = require('../models/favourite');

const connUri = process.env.NODE_ENV === 'development' ? process.env.MONGO_DEV_CONN_URL : process.env.MONGO_PROD_CONN_URL;

module.exports = {
  add: (req, res) => {
    mongoose.connect(connUri, { useNewUrlParser : true }, (err) => {
      let result = {};
      let status = 201;
      if (!err) {
        const { firstName, lastName, email, password } = req.body;
        const favourite = new Favourite({ firstName, lastName, email, password }); // document = instance of a model
        favourite.save((err, favourite) => {
          if (!err) {
            result.status = status;
            result.result = favourite;
          } else {
            status = 500;
            result.status = status;
            result.error = err;
          }
          res.status(status).send(result);
        });
      } else {
        status = 500;
        result.status = status;
        result.error = err;
        res.status(status).send(result);
      }
    });
  },
  getOne: (req, res) => {
    const { favourite_id } = req.body;

    mongoose.connect(connUri, { useNewUrlParser: true }, (err) => {
      let result = {};
      let status = 200;
      if(!err) {
        Favourite.findOne({favourite_id}, (err, favourite) => {
          if (!err && favourite) {
            result.status = status;
            result.result = favourite;
            res.status(status).send(result);
          } else {
            status = 404;
            result.status = status;
            result.error = err;
            res.status(status).send(result);
          }
        });
      } else {
        status = 500;
        result.status = status;
        result.error = err;
        res.status(status).send(result);
      }
    });
  },
}