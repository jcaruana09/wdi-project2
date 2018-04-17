const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  name: String,
  cuisine: String,
  rating: {type: Number, min: 1, max: 5}
});

module.exports = mongoose.model('Review', reviewSchema);
