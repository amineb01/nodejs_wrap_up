
var express = require('express');
var app     = express();
const posts = require('./controllers/posts')(express)

app.use( '/posts', posts );

module.exports = app
