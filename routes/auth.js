const models = require("../models");
const userController = require('../controllers/user.js');
module.exports = function(app, passport) {
    app.get('/login', function(req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    app.post('/login', passport.authenticate('local', {
        successRedirect : '/',
        failureRedirect : '/login',
        failureFlash : true
    }));

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
    app.get('/', userController.listUsers);
    app.post('/update', userController.updateUser);
    app.get('/create', userController.registerUser);
    app.post('/register', userController.createUser);
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}
