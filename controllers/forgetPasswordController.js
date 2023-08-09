const Users = require("../models/userModel");
const JWT = require("jsonwebtoken");
const nodemailer = require('nodemailer');
require("dotenv").config();


const forgetPasswordController = async(req, res)=>{

    try{
        const {email} = req.body;
        
        const oldUser = await Users.findOne({email});

        if(!oldUser){
            return res.status(200).send({
                success : false,
                message : "User doesn't Exists!"
            });
        }
        else{
            const secret = process.env.SECRET_KEY + oldUser.password;
            const token = JWT.sign({email: oldUser.email, id: oldUser._id}, secret, {
            expiresIn: "5m",
            });

            const link = `${process.env.SERVER_URL}/api/reset-password2/${oldUser._id}/${token}`;
            
            const transporter = nodemailer.createTransport({
              host: 'smtp.gmail.com',
              port: 587,
              secure: false,
              auth:{
                user: process.env.HOST_USERNAME,
                pass: process.env.HOST_PASSWORD
                }
              });
              
              var mailOptions = { 
                from: process.env.HOST_USERNAME,
                to:  email,
                subject: "Reset Your Foddzy Food Ordering App Password",
                text: `Hello ${oldUser.name},

                We hope this email finds you well. We noticed that you recently requested a password reset for your Foddzy Food Ordering 
                App account. We understand that security is a top priority, and we're here to help you regain access to your account.
                
                To proceed with the password reset, please follow the steps below:
                
                Click on the following link to access the password reset page:
                ${link}
                
                You will be directed to a secure page where you can enter your new password.
                
                For your security, please ensure that your new password adheres to the following guidelines:
                
                1)- It must be at least 8 characters long.
                2)- Include a mix of uppercase and lowercase letters.
                3)- Use at least one number (0-9) or special character (@, #, $, etc.).
                Once you've successfully reset your password, you'll be able to log in to the Foddzy Food Ordering App with your updated 
                credentials.
                
                If you did not initiate this password reset request, please take the following precautions:
                
                Do not click on any suspicious links or share your login information with anyone.
                Reach out to our support team immediately at foodzyfoods1k@yahoo.com to report the issue.
                Ensuring the safety and security of your account is of utmost importance to us, and we are committed to providing a 
                seamless and secure experience while using our app.
                
                If you encounter any issues or need further assistance with the password reset process, please don't hesitate to contact 
                our support team at foodzyfoods1k@yahoo.com We're here to help!
                
                Thank you for your trust in Foddzy Food Ordering App. We look forward to serving you delicious meals and ensuring 
                a delightful food ordering experience.
                
                Sincerely,
                
                The Foddzy Team`
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  return res.status(200).send({
                    success : false,
                    message : "Email doesn't send!",
                  })

                } else {
                  return res.status(200).send({
                    success : true,
                    message : "Reset Password link send to on your email, Please Check your email!",
                    link
                  })

                }
              });       
        }  
    }

    catch(err){
        console.log(err);
    }
}
module.exports = {forgetPasswordController};