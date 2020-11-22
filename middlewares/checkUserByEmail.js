var User = require('../models/User')
var Q = require('q');

const checkUserByEmail = ( req, res ) => {


  var deferred = Q.defer();
  User.findOne({
      email: req.body.email
    })
    .select('email name password')
    .exec()
    .then(user => {
      if(!user){
        deferred.reject("user not found");
      }else{
        console.log("checkUserByEmail", 'req.body.email')
        req.body.cryptedPassword = user.password
        req.body.id = user._id
        deferred.resolve()
      }

    })
    .catch(error => {
      console.log("error", error)
      deferred.reject(error);
    })

    return deferred.promise;

}


module.exports = checkUserByEmail;
