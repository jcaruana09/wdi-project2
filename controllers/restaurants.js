const Restaurant = require('../models/restaurant');

function restaurantIndex(req, res){
  Restaurant
    .find()
    .populate('user')
    .exec()
    .then(restaurants => res.render('restaurants/index', { restaurants }))
    .catch(err => {
      console.log(err);
      return res.sendStatus(500);
    });
}

function restaurantShow(req, res){
  Restaurant
    .findById(req.params.id)
    .populate('reviews.user')
    .exec()
    .then(restaurant => res.render('restaurants/show', { restaurant }));
}

function restaurantNew(req, res){
  res.render('restaurants/new', {err: null});
}

function restaurantCreate(req, res){
  req.body.user = req.currentUser;
  Restaurant
    .create(req.body)
    .then(() => {
      res.redirect('/restaurants');
    })
    .catch(err => {
      console.log(err);
      return res.sendStatus(500);
    });
}

function restaurantEdit(req, res){
  Restaurant
    .findById(req.params.id)
    .populate('reviews')
    .exec()
    .then(restaurant => res.render('restaurants/edit', { restaurant }));
}

function restaurantUpdate(req, res){
  Restaurant
    .findById(req.params.id)
    .exec()
    .then(restaurant => {
      restaurant = Object.assign(restaurant, req.body);
      return restaurant.save();
    })
    .then(restaurant => res.redirect(`/restaurants/${restaurant._id}`));
}

function restaurantDelete(req, res){
  Restaurant
    .findById(req.params.id)
    .exec()
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/restaurants'));
}

function reviewNew(req, res){
  res.render('reviews/new', {err: null});
}

function reviewCreate(req, res){
  Restaurant
    .findById(req.params.id)
    .exec()
    .then(restaurant => {
      req.body.user = req.currentUser;
      res.redirect('/restaurants/show');
    })
    .catch(err => {
      console.log(err);
      return res.sendStatus(500);
    });
}

module.exports = {
  index: restaurantIndex,
  show: restaurantShow,
  delete: restaurantDelete,
  new: restaurantNew,
  newReview: reviewNew,
  createReview: reviewCreate,
  create: restaurantCreate,
  edit: restaurantEdit,
  update: restaurantUpdate
};
