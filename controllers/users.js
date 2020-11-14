var User = require('../models/User')
var { generatePassword, verifyPassword } = require('../helpers/bycryptPasswordHandling')

const userController = (express) => {
  const router = express.Router();

  // middleware that is specific to this router
  router.use((req, res, next) => {
    console.log('Time to access users route: ', new Date().toLocaleDateString("en-US"));
    next();
  });

  router.get('/', function(req, res) {
    User.find()
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

  router.post('/', async function(req, res) {
    let cryptedPwd = await generatePassword(req.body.password)
    let user = new User({
      name: req.body.name,
      email: req.body.email,
      password: cryptedPwd,
    })

    user.save().then(result => {
        res.status(201).json({
          message: 'user created ',
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
    User.findById(req.params.id).then(result => {
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



module.exports = userController;
