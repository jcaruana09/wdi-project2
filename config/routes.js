const router = require('express').Router();
const registrations = require('../controllers/registrations');

router.get('/', (req, res) => res.render('../pages/home'));

//Authentication

router.route('/signup')
  .get(registrations.new)
  .post(registrations.create);

//Authentication end

module.exports = router;
