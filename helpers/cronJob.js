const cron = require("node-cron");
var User = require('../models/User')
var sendMail= require('./sendMail')


const runCronJob = ()=>{
  cron.schedule('* * * * *', () => {
    console.log('running a task every minute');
  });

  cron.schedule('* * * * *', () => {
    User.find().select('email')
        .then(users => {
          let emails= users.map(user=>user.email)
          // sendMail(emails.toString())
      })
  });

}

module.exports = runCronJob
