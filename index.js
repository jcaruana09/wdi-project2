
const express             = require('express');
const app                 = express();
const expressLayouts      = require('express-ejs-layouts');
const routes              = require('./config/routes');
const session             = require('express-session');
const flash               = require('express-flash');
const bodyParser          = require('body-parser');
const mongoose            = require('mongoose');
const User                = require('./models/user');
const {databaseURI, port} = require('./config/environment');
const customResponses     = require('./lib/customResponses');
mongoose.Promise          = require('bluebird');
const methodOverride      = require('method-override');


mongoose.connect(databaseURI);

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

app.use(expressLayouts);
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({extended: true}));


app.use(methodOverride((req) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use(session({
  secret: 'my super secret token',
  resave: false,
  saveUninitialized: false
}));

app.use(flash());
app.use(customResponses);

app.use((req, res, next) => {
  if(!req.session.userId) return next();

  User
    .findById(req.session.userId)
    .then(user => {
      res.locals.isLoggedIn = true;
      res.locals.user = user;
      req.session.userId = user._id;
      next();
    });
});

app.use(routes);

app.use((err, req, res, next) => {
  console.log('FATAL ERROR!');
  if(err){
    err.status = err.status || 500;
    err.message = err.message || 'Internal server error';
    res.status(err.status);
    res.locals.err = err;
    return res.render(`statics/${err.status}`);
  }
  next();
});

app.listen(port, () => console.log(`Up and running on port ${port}`));
