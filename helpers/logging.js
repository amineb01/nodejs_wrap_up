// logging package
var logger = require('morgan');
const fs = require('fs');


const appLogging = (app) => {
  //if we want to log only posts route we use it like this app.use('/posts', logger('tiny'));
  app.use(logger('tiny'));

  // write errors in access.log file
  app.use(logger('combined', {
    skip: function(req, res) {
      return res.statusCode < 400
    },
    stream: fs.createWriteStream('./access.log', {
      flags: 'a'
    })
  }));
  return app;
}


module.exports = appLogging;
