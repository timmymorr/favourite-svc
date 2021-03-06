/* eslint-disable camelcase */
const mongoose = require('mongoose');
const Favourite = require('../models/favourite');

const connUri = process.env.NODE_ENV === 'development'
  ? process.env.MONGO_DEV_CONN_URL
  : process.env.MONGO_PROD_CONN_URL;

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

module.exports = {
  addFavourite: (req, res) => {
    mongoose.connect(connUri, (err) => {
      let result;
      let status = 201;
      if (!err) {
        const { user_id } = req.params;

        const newFavourite = new Favourite({ user_id, ...req.body });
        newFavourite.save((error, favourite) => {
          if (!error) {
            result = {
              user_id: favourite.user_id,
              id: favourite.id,
            };
          } else {
            status = 500;
            result = {
              message: 'Unable to find favourite',
              code: status,
            };
          }
          res.status(status).send(result);
        });
      } else {
        status = 500;
        result = {
          message: 'Unable to find favourite',
          code: status,
        };
        res.status(status).send(result);
      }
    });
  },
  getFavourite: (req, res) => {
    const { user_id, id } = req.params;

    mongoose.connect(connUri, (error) => {
      let result = {};
      let status = 200;
      if (!error) {
        Favourite.findOne({ user_id, id }, (err, favourite) => {
          if (!err && favourite) {
            result = favourite;
            res.status(status).send(result);
          } else {
            status = 404;
            result = {
              message: 'Unable to find favourite',
              code: status,
            };
            res.status(status).send(result);
          }
        });
      } else {
        status = 500;
        result = {
          message: 'Unable to find favourite',
          code: status,
        };
        res.status(status).send(result);
      }
    });
  },
  getAll: (req, res) => {
    const { user_id } = req.params;

    mongoose.connect(connUri, (error) => {
      let result = {};
      let status = 200;
      if (!error) {
        Favourite.find({ user_id }, (err, favourites) => {
          if (!err && favourites) {
            result = favourites;
            res.status(status).send(result);
          } else {
            status = 404;
            result = {
              message: 'Unable to find favourite',
              code: status,
            };
            res.status(status).send(result);
          }
        });
      } else {
        status = 500;
        result = {
          message: 'Unable to find favourite',
          code: status,
        };
        res.status(status).send(result);
      }
    });
  },
  updateFavourite: (req, res) => {
    const { user_id, id } = req.params;

    mongoose.connect(connUri, (error) => {
      let result = {};
      let status = 200;
      if (!error) {
        Favourite.findOneAndUpdate({ user_id, id }, { ...req.body }, { new: true }, (err, favourite) => {
          if (!err && favourite) {
            result = favourite;
            res.status(status).send(result);
          } else {
            status = 404;
            result = {
              message: 'Unable to find favourite',
              code: status,
            };
            res.status(status).send(result);
          }
        });
      } else {
        status = 500;
        result = {
          message: 'Unable to find favourite',
          code: status,
        };
        res.status(status).send(result);
      }
    });
  },
  deleteFavourite: (req, res) => {
    const { user_id, id } = req.params;
    mongoose.connect(connUri, (error) => {
      let result;
      let status = 200;
      if (!error) {
        Favourite.findOneAndDelete({ user_id, id }, (err, favourite) => {
          if (!err && favourite) {
            result = {
              user_id: favourite.user_id,
              // eslint-disable-next-line no-underscore-dangle
              id: favourite._id,
              status: 'Deleted',
            };
            res.status(status).send(result);
          } else {
            status = 404;
            result = {
              message: 'Unable to find favourite',
              code: status,
            };
            res.status(status).send(result);
          }
        });
      } else {
        status = 500;
        result = {
          message: 'Internal server error',
          code: status,
        };
        res.status(status).send(result);
      }
    });
  },
};
