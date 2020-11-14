var express = require('express');

const posts = require('../controllers/posts')(express)

const router = (app) => {
  app.use('/posts', posts);
  return app;
}


module.exports = router;
