var User = require('../models/User')
var Q = require('q');
var deferred

const checkUserByEmail = ( req, res ) => {
  deferred = Q.defer();
  User.findOne({
      email: req.body.email
    })
    .select('email name password')
    .then(user => {
      req.body.cryptedPassword = user.password
      req.body.id = user._id
      deferred.resolve()
    })
    .catch(error => {
      deferred.reject("user not found");
    })
    return deferred.promise;
    // .then(user => {
    //   if (user) {
    //
    //     next()
    //   } else {
    //     return res.status(401).json({
    //       message: 'An error has occured0',
    //       error: 'user not found'
    //     });
    //   }
    //
    // }).catch(error => {
    //   return res.status(401).json({
    //     message: 'An error has occured0',
    //     error: error
    //   });
    // })

}


module.exports = checkUserByEmail;
