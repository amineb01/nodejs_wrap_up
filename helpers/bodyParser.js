// we use this module to access to body request
var bodyParser = require('body-parser')

const handleBodyParser = (app) => {
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());
  return app;
}


module.exports = handleBodyParser;
