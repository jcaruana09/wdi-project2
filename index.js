const morgan              = require('morgan');
const express             = require('express');
const app                 = express();
const expressLayouts      = require('express-ejs-layouts');
const routes              = require('./config/routes');
const session             = require('express-session');
// const bodyParser     = require('body-parser');
const mongoose            = require('mongoose');
const User                = require('./models/user');
const {databaseURI, port} = require('./config/environment');
const Promise             = require('bluebird');

mongoose.Promise = Promise;

mongoose.connect(databaseURI);

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

app.use(express.static(`${__dirname}/public`));
app.use(morgan('dev'));
app.use(expressLayouts);

app.get('/', (req, res) => res.render('pages/home'));

app.use(session({
  secret: 'my super secret token',
  resave: false,
  saveUninitialized: false
}));

app.use(routes);

// app.use((err, req, res, next) => {
//
// });

app.listen(port, () => console.log(`Up and running on port ${port}`));
