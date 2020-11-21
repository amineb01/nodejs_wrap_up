var Post = require('../models/Post')
var upload = require('../helpers/multerConfig')
var verifyToken= require('../middlewares/verifyToken')
var {setPost, getPosts, getOnePost} = require('../middlewares/posts')

const postController = (express) => {
  const router = express.Router();

  // middleware that is specific to this router
  router.use((req, res, next) => {
    console.log('Time to access posts route: ', new Date().toLocaleDateString("en-US"));
    next();
  });

  router.get('/',
    function(req, res, next) {
      verifyToken(req, res)
      .then( userId =>{
        req.headers.id = userId;
         next()
       })
      .catch( error => {
        return res.status(401).json({
          message: error,
          error: 'invalid token'
        });
      })
      .done()
    },

    function(req, res, next) {
      getPosts(req, res)
      .then( results =>{
        return res.status(201).json({
          message: 'success',
          results,
        });
       })
      .catch( error => {
        return res.status(500).json({
          message: 'An error has occured' ,
          error:  error
        });
      })
      .done()
    }
  );

  router.post('/',
    function(req, res, next) {
      verifyToken(req, res)
      .then( userId =>{
         next()
       })
      .catch( error => {
        return res.status(401).json({
          message: error,
          error: 'invalid token'
        });
      })
      .done()
    },
    
    upload.single('image'),

    function(req, res, next) {
      getOnePost(req, res)
      .then( results =>{
        return res.status(201).json({
          message: 'post created',
          results,
        });
       })
      .catch( error => {
        return res.status(500).json({
          message: 'An error has occured' ,
          error:  error
        });
      })
      .done()
    }
 );


  router.get('/:id',
    function(req, res, next) {
      verifyToken(req, res)
      .then( userId =>{
         next()
       })
      .catch( error => {
        return res.status(401).json({
          message: error,
          error: 'invalid token'
        });
      })
      .done()
    },

    function(req, res, next) {
      getOnePost(req, res)
      .then( results =>{
        return res.status(201).json({
          message: 'post found',
          results,
        });
       })
      .catch( error => {
        return res.status(500).json({
          message: 'post not found' ,
          error:  error
        });
      })
      .done()
    }

  )

  return router
}



module.exports = postController;
