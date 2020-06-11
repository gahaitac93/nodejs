var express = require('express');
var router = express.Router();
const controllers = require('../controllers');
const controllersAuth = require('../controllers/auth.js');
var {check, validationResult} = require('express-validator');


/* GET home page. */
router.get('/api/posts', controllers.getAllPosts);
router.get('/api/posts/:id', controllers.findPostById);
router.put('/api/posts/:id', controllers.updatePost);
router.delete('/api/posts/:id', controllers.deletePost);
router.post('/api/posts/', controllers.createPost);
router.post('/api/login/', controllersAuth.userLogin);
router.post('/api/users/', [
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
    const extractedErrors = [];
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    if (!errors.isEmpty()) {
        res.status(422).json({ errors: extractedErrors });
    }else {
        controllersAuth.createUser(req, res);
    }
});

module.exports = router;
