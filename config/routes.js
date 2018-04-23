const router        = require('express').Router();

const sessions      = require('../controllers/sessions');
const registrations = require('../controllers/registrations');
const restaurants  = require('../controllers/restaurants');


function secureRoute(req, res, next){
  if(!req.session.userId){
    return req.session.regenerate(() => {
      req.flash('danger', 'You must be logged in');
      res.redirect('/signin');
    });
  }
  return next();
}

router.get('/', (req, res) => {
  res.render('pages/home');
});
//Resource restaurants

router.route('/restaurants')
  .get(restaurants.index)
  .post(restaurants.create);

router.route('/restaurants/new')
  .get(restaurants.new)
  .post(restaurants.create);

router.route('/restaurants/:id')
  .get(restaurants.show)
  .put(restaurants.update)
  .delete(restaurants.delete)
  .post(restaurants.createReview);

router.route('/restaurants/:id/edit')
  .get(restaurants.edit);

//Resource restaurants end

//resourse reviews

router.route('/reviews/new')
  .get(restaurants.newReview);

//resourse reviews

//Authentication

router.route('/signup')
  .get(registrations.new)
  .post(registrations.create);

router.route('/signin')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);

//Authentication end

module.exports = router;
