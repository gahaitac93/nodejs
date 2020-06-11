module.exports = function(app, passport) {
    app.get('/', function(req, res) {
        res.render('index.ejs'); //
    });

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
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}
