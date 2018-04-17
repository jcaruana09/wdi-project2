const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const {databaseURI} = require('../config/environment');
mongoose.connect(databaseURI);

const Review = require('../modules/review');

Review.collection.drop();
