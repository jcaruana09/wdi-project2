const User = require('../models/user');

function newRoute(req, res){
  res.render('registrations/index');
}

function createRoute(req, res){
  console.log('inside createRoute registration');
  User
    .create(req.body)
    .then((user) => {
      console.log('inside createRoute registration---> user', user);
      req.flash('info', `Thanks for registering ${user.username}`);
      res.redirect('/signin');
    })
    .catch((err) => {
      console.log('inside the error',err);
      if(err.name === 'ValidationError'){
        return res.status(400).render('registrations/index', {message: err.toString()});
      }
    });
}

module.exports = {
  new: newRoute,
  create: createRoute
};
