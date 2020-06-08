var express = require('express');
var router = express.Router();
const controllers = require('../controllers');

/* GET home page. */
router.get('/api/posts', controllers.getAllPosts);
router.get('/api/posts/:id', controllers.findPostById);
router.put('/api/posts/:id', controllers.updatePost);
router.delete('/api/posts/:id', controllers.deletePost);
router.post('/api/posts/', controllers.createPost);

module.exports = router;
