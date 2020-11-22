var { verifyPassword } = require('../helpers/bycryptPasswordHandling')
var Q = require('q');
var deferred

const checkPassword = (req, res) => {
  deferred = Q.defer();
  console.log(req.body.cryptedPassword)
  verifyPassword(req.body.password, req.body.cryptedPassword).then(result=>{
    if(!result){
      deferred.reject('password not match');
    }else{
      deferred.resolve();
    }
  })
  .catch(error => {
    deferred.reject(error.message);
  })

  return deferred.promise;
}

module.exports = checkPassword;
