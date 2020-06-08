var express = require('express');
var app = express();
var router = express.Router();
const controllers = require('../controllers');

/* GET home page. */
router.get('/api/posts', controllers.getAllPosts);
router.get('/api/posts/:id', controllers.findPostById);
router.put('/api/posts/:id', controllers.updatePost);
router.delete('/api/posts/:id', controllers.deletePost);
router.post('/api/posts/', controllers.createPost);


var passport = require('passport');
var passportJWT = require('passport-jwt');
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
var jwtOptions = {};
var jwt = require('jsonwebtoken');

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'wowwow';

let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    console.log('payload received', jwt_payload);
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

router.post('/api/login', async function(req, res, next) {
    const { email, password } = req.body;
    if (email && password) {
        let user = await getUser({ email: email });
        console.log(user);
        if (!user) {
            res.status(401).json({ msg: 'No such user found', user });
        }
        if (user.password === req.body.password) {
            var payload = { id: user.id };
            var token = jwt.sign(payload, jwtOptions.secretOrKey);
            res.json({ message: 'ok', token: token });
        } else {
            res.status(401).json({ message: 'Password is incorrect' });
        }
    }
});

module.exports = router;
