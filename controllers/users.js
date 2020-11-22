var User = require('../models/User')
var checkUserByEmail = require('../middlewares/checkUserByEmail')
var verifyPassword = require('../middlewares/verifyPassword')
var generateToken = require('../middlewares/generateToken')
var generatePassword = require('../middlewares/generatePassword')


var { setUser, getUsers } = require('../middlewares/users')

const userController = (express) => {
const router = express.Router();

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time to access users route: ', new Date().toLocaleDateString("en-US"));
  next();
});

router.get('/',
  function(req, res, next) {
    getUsers(req, res)
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
  });

router.post('/signup',
  function(req, res, next) {
    generatePassword(req, res)
    .then( () =>{
      next()
     })
    .catch( error => {
      return res.status(500).json({
        message: 'An error has occured' ,
        error:  error
      });
    })

  },
  function(req, res, next) {
    setUser(req, res)
    .then( result =>{
      return res.status(201).json({
        message: 'user created',
        result,
      });
     })
    .catch( error => {
      return res.status(500).json({
        message: 'An error has occured' ,
        error:  error
      });
    })

  });

router.post('/signin',
  function(req, res, next) {
    checkUserByEmail(req, res)
    .then( result =>  next() )
    .catch( error => {
      return res.status(500).json({
        message: 'An error has occured' ,
        error:  error
      });
    })

  },
  function(req, res, next) {
    verifyPassword(req, res)
    .then( result => next() )
    .catch( error => {
      return res.status(500).json({
        message: 'An error has occured' ,
        error:  error
      });
    })
    .done()
  },
  function(req, res, next) {
    generateToken(req, res)
    .then( token => {
      console.log("token", token)
      return res.status(201).json({
        message: 'user authenticated',
        data: {
          id:    req.body.id,
          email: req.body.email,
          name:  req.body.name,
          token: token
        }
      });
    })
    .catch( error => {
      return res.status(500).json({
        message: 'An error has occured' ,
        error:  error
      });
    })
    .done()
  },
);

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
