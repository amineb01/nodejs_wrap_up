var User = require('../models/User')
var checkUserByEmail = require('../middlewares/checkUserByEmail')
var verifyPassword = require('../middlewares/verifyPassword')
var jwt = require('jsonwebtoken');

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
        message: 'An error has occured',
        error: error
      });
    })
});

router.post('/signup', async function(req, res) {
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

router.post('/signin', checkUserByEmail, verifyPassword, function(req, res) {
  var token = jwt.sign({exp: Math.floor(Date.now() / 1000) + (60 * 60 *24), data:{ email: req.body.email, name: req.body.name, id: req.body.id }}, process.env.privateKey);
  return res.status(201).json({
    message: 'user authenticated',
    data: {
      id:    req.body.id,
      email: req.body.email,
      name:  req.body.name,
      token: token
    }
  });


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
      message: 'An error has occured',
      error: error
    });
  })

})

return router
}



module.exports = userController;
