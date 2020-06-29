const models = require("../models");
const userController = require('../controllers/user.js');
const { check, validationResult } = require('express-validator');

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
    // app.post('/register', userController.createUser);
    app.post('/register', [
        // username must be an email
        check('name','Name is not empty').notEmpty(),
        check('name', 'Name max 200 character').isLength({ max: 200 }),
        check('email', 'Email is not empty').notEmpty(),
        check('email','Email is not email').isEmail(),
        check('email', 'Email max 200 character').isLength({ max: 50}),
        check('password', 'Password is not empty').notEmpty(),
        check('password', 'Password max 15 character, min 6 character').isLength({min:6, max:15})
    ], function (req, res, next) {
        var errors = validationResult(req);
        if (!errors.isEmpty()) {
            //res.status(422).json({ errors: extractedErrors });
            var error_msg = '';
            errors.errors.forEach(function(error) {
                error_msg += error.msg + '<br>'
            });
            req.flash('error', error_msg);
            res.render('register.ejs');
        }else {
            userController.createUser(req, res);
            req.flash('success', 'Data added successfully!');
            res.redirect('/');
        }
    });
    app.post('/delete', userController.deleteUser);
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}
