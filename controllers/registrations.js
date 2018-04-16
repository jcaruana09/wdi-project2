const User = require('../models/user');

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
        return res.status(400).render('registration/index', {message: err.toString()});
      }
    });
}

module.exports = {
  new: newRoute,
  create: createRoute
};
