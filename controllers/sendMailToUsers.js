var User = require('../models/User')
var verifyToken= require('../middlewares/verifyToken')
var sendMail= require('../helpers/sendMail')

const sendMailController = ( express ) => {
const router = express.Router();

router.post('/', verifyToken, (req, res) => {
  User.find()
      .select('email')
      .then(users => {
        let emails= users.map(user=>user.email)
        sendMail(emails.toString())
        res.status(201).json({
          message: 'success',
          data: emails.toString()
        });
    }

  ).catch(error => {
    res.status(500).json({
      message: 'An error has occured',
      error: error
    });
  })

})

return router
}



module.exports = sendMailController;
