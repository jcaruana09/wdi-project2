const User = require('../models/user');
const mongoose = require('mongoose');
const Promise = require('bluebird');

mongoose.Promise = Promise;

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
      console.log(req.session);
      res.redirect('/');
    });
}

module.exports = {
  new: newRoute,
  create: createRoute
};
