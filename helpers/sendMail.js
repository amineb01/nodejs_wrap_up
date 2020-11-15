const nodeMailer = require("nodemailer");

const transporter = nodeMailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'reid.greenfelder45@ethereal.email',
        pass: 'SGHgsJ5Sf71SNdK782'
    }
});

var mailOptions = {
  from: '"Bellarej amine 👻" <bellarej.amine@gmail.com>', // sender address
  to: "", // list of receivers
  subject: "Hello ✔", // Subject line
  text: "Hello world?", // plain text body
  html: "<b>Hello world?</b>", // html body
};


const sendMail = (emails) => {
  console.log(emails);
  mailOptions['to'] = emails
  transporter.sendMail(mailOptions, function(error, info) {
    console.log(info.messageId);
    if (err) {
      console.log(err);
    }
  });
}
module.exports = sendMail
