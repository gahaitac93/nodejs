var LocalStrategy   = require('passport-local').Strategy;
const models = require("../models");

const { Op } = require("sequelize");

module.exports = function(passport) {

    passport.use(new LocalStrategy({
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true
        },function(req, email, password, done) {

        models.User.findOne({
            where : {
             email:email
         }
        }).then(user => {
            if (!user) {
                return done(null, false, { message: 'That email is not registered' });
            }
            if (!user.validPassword(password)) {
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
            }
            return done(null, user, { message: 'Password incorrect' });
        }).catch(err => {
            console.log(err)
        });
    }));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        models.User.findByPk(id).then(user => {
            return done(null, user);
        }).catch(err => {
            console.log(err.message)
        })
    });

};
