var User = require('../models/User')
var Q = require('q');
var { generatePassword } = require('../helpers/bycryptPasswordHandling')
var deferred

const getUsers = (req, res) => {
  deferred = Q.defer();
  User.find()
  .select('_id name email')
  .then(users => {
    deferred.resolve( {
       users,
       count: users.length
     });
   })
    .catch(error => {
      deferred.reject(error);
    })
  return deferred.promise;
}

const setUser = (req, res) => {
  deferred = Q.defer();
  generatePassword( req.body.password ).then(cryptedPwd=>{
    console.log('1')
    let user = new User({
      name: req.body.name,
      email: req.body.email,
      password: cryptedPwd,
    })

    user.save()
    .then(result => {
      console.log('2')
      deferred.resolve(result)
    })
    .catch(error => {
      console.log('3')
      deferred.reject(error.message);
    })
  }).catch(error => {
    console.log('4')
    deferred.reject(error.message);
  })

  return deferred.promise;
}



module.exports = { getUsers, setUser }
