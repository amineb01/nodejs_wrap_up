var Post = require('../models/Post')
const postController = (express) => {
  const router = express.Router();

  // middleware that is specific to this router
  router.use((req, res, next) => {
    console.log('Time to access posts route: ', new Date().toLocaleDateString("en-US"));
    next();
  });

  router.get('/', function(req, res) {
    Post.find()
        .select('_id title body')
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

  router.post('/', function(req, res) {
    const name = req.body.name;
    let post = new Post({
      title: req.body.title,
      body: req.body.body,
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


  router.get('/:id', (req, res) => {
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
