var jwt = require('jsonwebtoken');
var Q = require('q');
var deferred

const generateToken = (req, res) => {
  deferred = Q.defer();
  try {
    var token = jwt.sign({exp: Math.floor(Date.now() / 1000) + (60 * 60 *24),
                         data:{ email: req.body.email, name: req.body.name, id: req.body.id }},
                         process.env.privateKey);

    deferred.resolve( token);
  } catch (e) {
    deferred.reject(e);
  }

  return deferred.promise;
}


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

module.exports = {verifyToken, generateToken};
