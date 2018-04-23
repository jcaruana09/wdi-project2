const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  rating: {type: Number, min: 1, max: 5},
  review: String,
  user: {type: mongoose.Schema.ObjectId, ref: 'User'}
});

const restaurantSchema = new mongoose.Schema({
  name: {type: String, required: true},
  cuisine: {type: String, required: true},
  location: {type: String, required: true},
  reviews: [reviewSchema],
  user: {type: mongoose.Schema.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
