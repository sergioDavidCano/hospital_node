const passport = require('passport');
const { isAuthenticated } = require('../lib/auth');
const ctrl = {};
ctrl.signupRender = async(req, res) => {
  res.render('auth/signup')
};
ctrl.signup = passport.authenticate('local',{
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
}); 
// signin
ctrl.signinRender = async(req, res) => {
  res.render('auth/signin');
};
ctrl.signin = async(req, res, next) => {
  passport.authenticate('local.signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    failureFlash: true
  })(req, res, next);
};

ctrl.logout=(req, res) => {
  req.logOut();
  res.redirect('/');
};
ctrl.init  = isAuthenticated, (req, res) => {
  res.render('auth/profile');
};
module.exports = ctrl
