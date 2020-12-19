const nodeMailer = require("nodemailer");
const dotenv = require('dotenv');
dotenv.config();

const transporter = nodeMailer.createTransport({
  service: 'gmail',
  // by defaukt gmail don't allow us to use authentification like this
  // we should activate less security
  // https://myaccount.google.com/lesssecureapps?pli=1&rapt=AEjHL4Nm9uol8RrvM9Rb7vDU0hbPfMlgxnOipC3rwWmfqQfiEg5ADF_mPdsjhQxGcP9mNk0ZAlTU_tWQENeAyg95QR-CIJ6Glg
  auth: {
    user: process.env.GOOGLE_USER,
    pass: process.env.GOOGLE_PASS
  }
});

var mailOptions = {
  from: '"Bellarej amine 👻" <bellarej.amine@gmail.com>', // sender address
  to: "", // list of receivers
  subject: "Hello ✔", // Subject line
  text: "Hello world?", // plain text body
  html: "<h1>this email was sent by our app</h1><b><h2>don't worry it's just to say hello</h2></b>", // html body
};


const sendMail = (emails) => {
  mailOptions['to'] = emails
  transporter.sendMail(mailOptions, function(error, info) {
    console.log(info.messageId);
    if (error) {
      console.log(error);
    }
  });
}
module.exports = sendMail
