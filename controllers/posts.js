var Post = require('../models/Post')
var upload = require('../helpers/multerConfig')
var verifyToken= require('../middlewares/verifyToken')
const postController = (express) => {
  const router = express.Router();

  // middleware that is specific to this router
  router.use((req, res, next) => {
    console.log('Time to access posts route: ', new Date().toLocaleDateString("en-US"));
    next();
  });

  router.get('/', verifyToken, function(req, res) {
    Post.find({user: req.headers.id})
        .select('_id title body user_id ')
        .populate('user', 'name')
        .then(results => {
        res.status(201).json({
          message: 'success',
          data: results,
          count: results.length
        });
      }

    ).catch(error => {
      res.status(500).json({
        message: 'An error has occured' ,
        error:  error
      });
    })
  });

  router.post('/', verifyToken, upload.single('image'), function(req, res) {
    const name = req.body.name;
    let post = new Post({
      title: req.body.title,
      body: req.body.body,
      user: req.body.user,
      image: req.file.path,
    })

    post.save().then(result => {
        res.status(201).json({
          message: 'post created ',
          data: result
        });
      }

    ).catch(error => {
      res.status(500).json({
        message: 'An error has occured',
        error: error.message
      });
    })

  });


  router.get('/:id', verifyToken,  (req, res) => {
    Post.findById(req.params.id).then(result => {
        res.status(201).json({
          message: 'success',
          data: result
        });
      }

    ).catch(error => {
      res.status(500).json({
        message: 'An error has occured' ,
        error:  error
      });
    })

  })

  return router
}



module.exports = postController;
