const Users = require("../models/userModel");
const JWT = require("jsonwebtoken");
require("dotenv").config();
const path = require("path");  


const resetPasswordVerified = async(req, res)=>{
    try{
        const { id, token } = req.params;

        const oldUser = await Users.findOne({_id: id}); 
        if(!oldUser){
            return res.status(200).send({    
                success : false,
                message : "User doesn't Exists!"
            })
        }

        const secret = process.env.SECRET_KEY + oldUser.password;
        try{
            const verify = JWT.verify(token, secret); 
             
            res.redirect(`${process.env.CLIENT_URL}/resetpassword/${id}`)
        }
        catch(err){
            return res.status(200).send({
                success: false,
                message:'Token not Verified!',   
            }) 
        }
    }
    catch(err){
        console.log(err);
    }
}
module.exports = {resetPasswordVerified};