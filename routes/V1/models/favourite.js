const mongoose = require('mongoose');

const environment = process.env.NODE_ENV;
const stage = require('../../../config')[environment];

// schema maps to a collection
const Schema = mongoose.Schema;

const favouriteSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  }
});

module.exports = mongoose.model('Favourite', favouriteSchema);