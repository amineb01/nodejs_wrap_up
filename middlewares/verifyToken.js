var jwt = require('jsonwebtoken');
var Q = require('q');
var deferred



const verifyToken = (req, res) => {
  deferred = Q.defer();
  let token = req.headers.token
  if (!token) {
    deferred.reject('token is required');
  } else {
    var decoded = jwt.verify(token, process.env.privateKey, function(err, decoded) {
      if (decoded) {
        deferred.resolve( decoded.data.id);
      } else {
        deferred.reject('token is invalid');
      }
    });

  }
  return deferred.promise;
}

module.exports = verifyToken;
