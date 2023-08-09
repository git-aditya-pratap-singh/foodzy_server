const Users = require("../models/userModel");
const {comparePassword} = require("../helpers/pswdencrypt");
const JWT = require("jsonwebtoken");
require("dotenv").config();


const loginController = async(req, res)=>{

    try{
        const {email, password} = req.body;

        // check user
        const userLogin = await Users.findOne({email})
        if(!userLogin){
            return res.status(200).send({
                success : false,
                message : "These email is not Register!"
            })
        }

        const match = await comparePassword(password, userLogin.password)
        if(!match){
            return res.status(200).send({
                success : false,
                message : "Invalid Password!"
            }) 
        }

        // Generating tokens --------------
        const token = JWT.sign({_id:userLogin._id}, process.env.SECRET_KEY,{
            expiresIn: "7d",
        });
        

        res.status(200).send({
            success:true,
            message:'Login successfully!',
            user:{
                id: userLogin._id,
                name:userLogin.name,
                email:userLogin.email,
                phone:userLogin.phone,
                address:userLogin.address,
                flatno:userLogin.flatno,
                landmark:userLogin.landmark
            },
            token,
        })


    }
    catch(err){
        console.log(err);
        res.status(500).send({
            success:false,
            message:"Error in Login"
        })
    }

}

module.exports = {loginController};