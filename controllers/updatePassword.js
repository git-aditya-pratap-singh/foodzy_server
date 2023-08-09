const Users = require("../models/userModel");
const JWT = require("jsonwebtoken");
const {hashPassword} = require("../helpers/pswdencrypt");
require("dotenv").config();

const updatePassword = async(req, res)=>{
    
    const {id} = req.params;
    const { password } = req.body;

    const oldUser = await Users.findOne({_id : id});
    if(!oldUser){
        return res.status(200).send({
            success : false,
            message : "User doesn't Exists!"
        })
    }

    //const secret = process.env.SECRET_KEY + oldUser.password;
    try{
        //const verify = JWT.verify(token, secret);
         // password encrypt-------------------------
         const hashedPassword = await hashPassword(password);
         await Users.updateOne( 
            {_id : id},
            {$set:{
                password : hashedPassword,
            },
        })

        res.status(200).send({
            success : true,
            message: "Your Password is Reset !"
        })

    }
    catch(err){
        res.status(200).send({
            success : false,
            message: "Tokens Not Verified !"
        })
    }

}
module.exports = {updatePassword};