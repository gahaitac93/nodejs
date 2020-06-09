var express = require('express');
var app = express();
var passport = require('passport');
var passportJWT = require('passport-jwt');
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
var jwtOptions = {};
var jwt = require('jsonwebtoken');

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'wowwow';

let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    let user = getUser({ id: jwt_payload.id });

    if (user) {
        next(null, user);
    } else {
        next(null, false);
    }
});

passport.use(strategy);

app.use(passport.initialize());

const models = require("../models");

const getUser = async obj => {
    return models.User.findOne({
        where: obj,
    });
};

const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (email && password) {
            let user = await getUser({ email : email});
            if (!user) {
                res.status(401).json({ message: 'No such user found' });
            }
            if (user.password === password) {
                let payload = { id: user.id };
                let token = jwt.sign(payload, jwtOptions.secretOrKey);
                return res.json({ message: 'success', token: token });
            } else {
                return res.status(401).json({ message: 'Password is incorrect' });
            }
        }
    }catch (e) {
        return res.status(500).send(e.message);
    }
};

const createUser = async (req, res) => {
    try {
        let data = req.body;
        if(data) {
            let user = await models.User.create(data);
            return res.json({ message: 'success', user: user });
        }

    }catch (e) {
        return res.status(500).send(e.message);
    }
};

module.exports = {
    userLogin,
    createUser
};

