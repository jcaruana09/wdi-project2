const Review = require('../models/review');
// const mongoose = require('mongoose');
// const Promise = require('bluebird');
//
// mongoose.Promise = Promise;

function reviewsIndex(req, res){
  Review
    .find()
    .populate('user')
    .exec()
    .then(reviews => {
      res.render('reviews/index', {reviews});
    });
}

module.exports = {
  index: reviewsIndex
};
