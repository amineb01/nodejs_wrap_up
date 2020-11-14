var express = require('express');

const posts = require('../controllers/posts')(express)
const users = require('../controllers/users')(express)

const router = (app) => {
  app.use('/posts', posts);
  app.use('/users', users);
  return app;
}


module.exports = router;
