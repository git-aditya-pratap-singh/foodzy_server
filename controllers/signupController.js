const Users = require("../models/userModel");
const {hashPassword} = require("../helpers/pswdencrypt");

const signupController = async (req, res)=>{
    try{
        const {name, email, phone, password} = req.body;
        
        //check email is registered or not
        const existingUser1 = await Users.findOne({email: email})
        //existing user
        if(existingUser1){
            return res.status(200).send({
                success:false,
                message: 'This Email is already Registered!'
            })
        }


         //check phone no is registered or not
        const existingUser2 = await Users.findOne({phone: phone})
        
        //existing user
        if(existingUser2){
            return res.status(200).send({
                success:false,
                message: 'This Phone-no is already Registered!'
            })
        }


        
        // password encrypt-------------------------
        const hashedPassword = await hashPassword(password);

        // save
        const user = await new Users({name,email,phone,password:hashedPassword}).save()
        
        res.status(200).send({
            success:true,
            message: 'Registration has been Successfully!'
        })

    }
    catch(err){
        console.log(err)
        res.status(200).send({
            success:false,
            message:'Error in Registeration',
     })
    }

}

module.exports = {signupController};