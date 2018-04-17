const router        = require('express').Router();

const sessions      = require('../controllers/sessions')
const registrations = require('../controllers/registrations');
// const reviews       = require('../controllers/reviews');

router.get('/', (req, res) => {
  res.render('../pages/home');
});
//Resource reviews

// router.route('/reviews')
//   .get(reviews.index)
//   .post(reviews.create);

//Resource reviews end

//Authentication

router.route('/signup')
  .get(registrations.new)
  .post(registrations.create);

router.route('/signin')
  .get(sessions.new)
  .post(sessions.create);

//Authentication end

module.exports = router;
