var jwt = require('jsonwebtoken');
var Q = require('q');
var deferred

const generateToken = (req, res) => {
  deferred = Q.defer();
  var token = jwt.sign({exp: Math.floor(Date.now() / 1000) + (60 * 60 *24),
                       data:{ email: req.body.email, name: req.body.name, id: req.body.id }},
                       process.env.privateKey);
  deferred.resolve( token);
  return deferred.promise;
}

module.exports = generateToken;
//
//
//
//
// jwt.sign({ foo: 'bar' }, privateKey, function(err, token) {
//   console.log(token);
// });
