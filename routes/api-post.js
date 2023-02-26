const express = require('express');

const { getNewPostForm, createNewPost } = require('../controllers/post');

const router = express.Router();

router.get('/new-post', getNewPostForm);
router.post('/new-post', createNewPost);

// API
router.get('/api/post', getNewPostForm);
router.post('/api/post', createNewPost);

module.exports = router;