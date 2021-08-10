const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const validator = require('express-validator');
const passport = require('passport');
const flash = require('connect-flash');
const MySQLStore = require('express-mysql-session')(session);
const { database } = require('./keys');
const app = express();
require('./lib/passport');
//hbs
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');
// Middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(flash());
app.use(session({
  secret: 'mysecretApp',
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore(database)
}));
app.use(passport.initialize());
app.use(passport.session());
// Global variables
app.use((req, res, next) => {
  app.locals.mensaje = req.flash('mensaje');
  app.locals.exito = req.flash('exito');
  app.locals.user = req.user;
  next();
});
// Routes
app.use(require('./router/index'));
// Public
app.use(express.static(path.join(__dirname, 'public')));
// Starting
app.listen(app.get('port'), () => {
  console.log('Servidor en el puerto', app.get('port'));
});
