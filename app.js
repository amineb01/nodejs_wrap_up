var express = require('express');
var app = express();

require('./helpers/dbConnect')

require('./helpers/handlingCors')(app)
require('./helpers/logging')(app)
require('./helpers/bodyParser')(app)
require('./helpers/cronJob')()

require('./router/index')(app)

app.use(express.static('uploads'))
// 27017 localhost
// handle every request reach this line
require('./helpers/errorHandling')(app)

module.exports = app
