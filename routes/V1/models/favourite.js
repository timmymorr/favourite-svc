const mongoose = require('mongoose');

// schema maps to a collection
const { Schema } = mongoose;

const favouriteSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  popularity: Number,
  vote_count: Number,
  video: {
    type: Boolean,
  },
  poster_path: {
    type: String,
    trim: true,
    unique: true,
  },
  adult: Boolean,
  backdrop_path: {
    type: String,
    trim: true,
    unique: true,
  },
  original_language: String,
  original_title: {
    type: String,
    trim: true,
    unique: true,
  },
  genre_ids: [String, String],
  title: {
    type: String,
    trim: true,
    unique: true,
  },
  vote_average: Number,
  overview: {
    type: String,
    trim: true,
  },
  release_date: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model('Favourite', favouriteSchema);
