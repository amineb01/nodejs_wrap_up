var { verifyPassword } = require('../helpers/bycryptPasswordHandling')


const checkPassword = (req, res, next) => {
  verifyPassword(req.body.password, req.body.cryptedPassword).then(result=>{
    console.log(result)
    if(!result){
      return res.status(401).json({
         message: 'An error has occured',
         error: 'user not found'
       });
    }else{
      next()
    }
  })

}


module.exports = checkPassword;
