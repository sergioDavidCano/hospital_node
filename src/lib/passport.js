const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('./helpers');
passport.use('local.signin', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  const rows = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  if (rows.length > 0) {
    const user = rows[0];
    const validPassword = await helpers.matchPassword(password, user.password)
    if (validPassword) {
      done(null, user, req.flash('exito', 'Bienvenido ' + user.username));
    } else {
      done(null, false, req.flash('mensaje', 'Contraseña incorrecta'));
    }
  } else {
    return done(null, false, req.flash('mensaje', 'El usuario no existe.'));
  }
}));
passport.use('local',new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req,username, password, done) => {
  const { email} = req.body;
  let newUser = {
    email,
    username,
    password
  };
  newUser.password = await helpers.encryptPassword(password);
  const result = await pool.query('INSERT INTO users SET ? ', newUser);
  newUser.id = result.insertId;
  return done(null, newUser);
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  done(null, rows[0]);
});

