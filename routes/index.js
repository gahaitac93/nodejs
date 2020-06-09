var express = require('express');
var router = express.Router();
const controllers = require('../controllers');
const controllersAuth = require('../controllers/auth.js');

/* GET home page. */
router.get('/api/posts', controllers.getAllPosts);
router.get('/api/posts/:id', controllers.findPostById);
router.put('/api/posts/:id', controllers.updatePost);
router.delete('/api/posts/:id', controllers.deletePost);
router.post('/api/posts/', controllers.createPost);
router.post('/api/login/', controllersAuth.userLogin);
router.post('/api/users/', controllersAuth.createUser)

module.exports = router;
