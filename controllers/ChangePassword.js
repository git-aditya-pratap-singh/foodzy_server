const Users = require("../models/userModel");
const {hashPassword} = require("../helpers/pswdencrypt");
const {comparePassword} = require("../helpers/pswdencrypt");
const ChangePassword = async(req, res)=>{
    try{
        const id = req.params.id;
        const data = req.body;

        const userinfo = await Users.findById({_id:id})

        const match = await comparePassword(data.cupassword, userinfo.password)
        if(!match){
            res.status(200).send({
                success : false,
                message : "Invalid Current Password!"
            }) 
        }

        // password encrypt-------------------------
        const newhashedPassword = await hashPassword(data.npassword);

        await Users.findByIdAndUpdate(
            {_id:id},
            {$set:{
                password: newhashedPassword
            }},
            {new: true}
        )

        res.status(200).send({
            success: true,
            message: "Your password has been changed successfully!"
        })
  
    }
    catch(err){
        res.status(200).send({
            success: false,
            message: "Your password doesn't changed!"
        })
    }
}
module.exports = {ChangePassword};