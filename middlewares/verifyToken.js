var jwt = require('jsonwebtoken');


const verifyToken = (req, res, next) => {
  let token = req.headers.token
  if (!token) {
    return res.status(401).json({
      message: 'token is required',
      error: 'invalid token'
    });
  } else {
    var decoded = jwt.verify(token, process.env.privateKey);
    if (decoded) {
      req.headers.id = decoded.data.id
      next()
    } else {
      return res.status(401).json({
        message: 'token is invalid',
        error: 'invalid token'
      });
    }
  }

}




module.exports = verifyToken;
