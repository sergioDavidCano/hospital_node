const helpers = {};
helpers.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('mensaje', 'No estas con una seccion');
    res.redirect('/signin');
};
helpers.vereficacionADMIN_ROLE = (req, res, next) => {
    let user = req.user;
    if (user.role === 'ADMIN_ROLE') {
        next();
    } else{
        req.flash('mensaje', 'No eres un administrador');
        res.redirect('/profile');
    }
};
module.exports = helpers;