var express = require('express');
var router = express.Router();
const models = require("../models");
const bcrypt = require('bcryptjs');
const userController = require('../controllers/user.js');

router.get('/register', function(req, res) {
    res.render('register');
});
router.post('/register',userController.createUser);
router.get('/', function(req, res) {
    res.render('index');
});
router.get('/login', (req, res) => {
    res.render('login');
});

module.exports = router;
