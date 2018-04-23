const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const {databaseURI} = require('../config/environment');
mongoose.connect(databaseURI);

const Restaurant = require('../models/restaurant');
const User = require('../models/user');

User.collection.drop();
Restaurant.collection.drop();


User
  .create([
    {
      username: 'aaa',
      email: 'a@a',
      password: 'password',
      passwordConfirmation: 'password'
    },
    {
      username: 'bbb',
      email: 'b@b',
      password: 'password',
      passwordConfirmation: 'password'
    },
    {
      username: 'ccc',
      email: 'c@c',
      password: 'password',
      passwordConfirmation: 'password'
    }
  ])
  .then(users => {
    console.log(`${users.length} users were created!`);

    return Restaurant.create([
      {
        name: 'Carluccios',
        cuisine: 'Italian',
        location: 'Kingston',
        user: users[0]._id,
        reviews: [
          {
            rating: 3,
            review: 'amazing',
            user: users[1]._id
          },{
            rating: 3,
            review: 'lovely',
            user: users[2]._id
          }
        ]
      }
    ]);
  })
  .then(restaurants => {
    console.log(`${restaurants.length} restaurants were created!`);
  })
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());











// Review.create({
//   username: 'jack55',
//   rating: 4,
//   reviews: [
//     {
//       rating: 3,
//       review: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//       user
//     }
//   ]
// },{
//   username: 'jak6657',
//   rating: 2,
//   review: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
//
// },{
//   username: 'j5505',
//   rating: 5,
//   review: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
//
// });
//
// // .then((reviews) => {
// Restaurant.create([{
//   name: 'Carluccios',
//   cuisine: 'Italian',
//   location: 'Kingston',
//   reviews: [
//     {
//
//     }
//   ]
// }])
//   // })
//   .then(restaurants => console.log(`${restaurants.length} restaurants created`))
//   .catch(err => console.log(err))
//   .finally(() => mongoose.connection.close());
