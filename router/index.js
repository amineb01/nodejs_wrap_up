var express = require('express');

const posts = require('../controllers/posts')(express)
const users = require('../controllers/users')(express)
const sendMail = require('../controllers/sendMailToUsers')(express)

const router = (app) => {
  app.use('/posts', posts);
  app.use('/users', users);
  app.use('/sendMail', sendMail);

  return app;
}


module.exports = router;
