const User = require('../models/user');

function newRoute(req, res){
  res.render('sessions/index');
}

function createRoute(req, res){
  User
    .findOne({ email: req.body.email })
    .then(user => {
      if(!user || !user.validatePassword(req.body.password)){
        return res.redirect('/signin');
      }
      req.session.userId = user.id;
      res.redirect('/');
    });
}

function deleteRoute(req, res){
  return req.session.regenerate(()=> res.redirect('/'));
}

module.exports = {
  new: newRoute,
  create: createRoute,
  delete: deleteRoute
};
