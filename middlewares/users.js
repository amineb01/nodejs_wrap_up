var User = require('../models/User')
var Q = require('q');
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
    let user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
    user.save()
    .then(result => {
      deferred.resolve(result)
    })
    .catch(error => {
      deferred.reject(error.message);
    })

  return deferred.promise;
}



module.exports = { getUsers, setUser }
