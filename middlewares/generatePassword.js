var User = require('../models/User')
var Q = require('q');
var { _generatePassword }  = require('../helpers/bycryptPasswordHandling')

var deferred

const generatePassword = ( req, res ) => {

  deferred = Q.defer();
  _generatePassword( req.body.password )
    .then(cryptedPwd=>{
    req.body.password = cryptedPwd
    deferred.resolve() })
    .catch(error => { deferred.reject(error.message);})
  return deferred.promise;

}


module.exports = generatePassword;
