var User = require('../models/User')

const checkUserByEmail = (req, res, next) => {
  User.findOne({
      email: req.body.email
    })
    .select('email name password')
    .then(user => {
      if (user) {
        req.body.cryptedPassword = user.password
        req.body.id = user._id
        next()
      } else {
        return res.status(401).json({
          message: 'An error has occured0',
          error: 'user not found'
        });
      }

    }).catch(error => {
      return res.status(401).json({
        message: 'An error has occured0',
        error: error
      });
    })

}


module.exports = checkUserByEmail;
