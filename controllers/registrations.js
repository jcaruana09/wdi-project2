const User = require('../models/user');
const mongoose = require('mongoose');
const Promise = require('bluebird');

mongoose.Promise = Promise;

function newRoute(req, res){
  res.render('registrations/index');
}

function createRoute(req, res){
  console.log('this is req:', req);
  User
    .create(req.body)
    .then(() => {
      res.redirect('/');
    })
    .catch((err) =>{
      if(err.name === 'ValidationError'){
        return res.status(400).render('registrations/index', {message: err.toString()});
      }
    });
}

module.exports = {
  new: newRoute,
  create: createRoute
};
