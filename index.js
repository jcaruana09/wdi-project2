const morgan         = require('morgan');
const express        = require('express');
const app            = express();
const port           = 3000;
const expressLayouts = require('express-ejs-layouts');
const routes         = require('./config/routes');

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(expressLayouts);

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => res.render('pages/home'));

app.use(routes);

app.listen(port, () => console.log('Up and running on port ${port}'));
