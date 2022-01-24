const nodemailer = require('nodemailer');
const html = require('../helpers/signup');

const url = "http://localhost:3000/api/auth";

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'daongocnham1962@gmail.com',
        pass:"Nham1962"
    }
});

const  signupMail = async(to,name)=>{
    try {
        const message = {
          from: "daongocnham1962@gmail.com",
          to,
          subject: "Welcome to PERN Store",
          html: html(name),
        };
    
        await transporter.sendMail(message);
      } catch (error) {
        console.log(error);
    }
}

const forgotPasswordMail = async (token, email) => {
    try {
      const message = {
        to: email,
        subject: "Forgot Password",
        html: `<p>To reset your password, please click the link below.
        <a href="${url}/check-token?token=${encodeURIComponent(
          token
        )}&email=${email}"><br/>
        Reset Password
        </a></p>
        <p><b>Note that this link will expire in the next one(1) hour.</b></p>`,
      };
  
      const res = await transporter.sendMail(message);
      return res;
    } catch (error) {
        console.log(error);
        throw new ErrorHandler(500, error.message);
    }
  };

  const resetPasswordMail = async (email) => {
    try {
      const message = {
        from: process.env.SMTP_FROM,
        to: email,
        subject: "Password Reset Successful",
        html: "<p>Your password has been changed successfully.</p>",
      };
  
      await transporter.sendMail(message);
    } catch (error) {
      console.log(error);
      throw new ErrorHandler(500, error.message);
    }
  };
  
module.exports = {
    signupMail,
    resetPasswordMail,
    forgotPasswordMail,
  };