var { verifyPassword, _generatePassword } = require('../helpers/bycryptPasswordHandling')
var Q = require('q');
var deferred

const checkPassword = (req, res) => {
  deferred = Q.defer();

  verifyPassword(req.body.password, req.body.cryptedPassword).then(result=>{
    if(!result){
      deferred.reject('password not match');
    }else{
      deferred.resolve(result);
    }
  })
  .catch(error => {
    deferred.reject(error.message);
  })

  return deferred.promise;
}

const generatePassword = ( req, res ) => {

  deferred = Q.defer();
  _generatePassword( req.body.password )
    .then(cryptedPwd=>{
    req.body.password = cryptedPwd
    deferred.resolve() })
    .catch(error => { deferred.reject(error.message);})
  return deferred.promise;

}

module.exports = {checkPassword, generatePassword };
