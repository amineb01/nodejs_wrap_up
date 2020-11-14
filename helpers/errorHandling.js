// logging package
const errorHandling = (app)=>{
  app.use((req, res, next) => {
    const error = new Error('not found ');
    error.status = 404;
    next(error);
  });

  app.use((error, req, res, next) => {
    error.status = (error.status || 500);
    res.status(error.status).json({
      message: error.message
    });
  });

  return app
}

module.exports = errorHandling
