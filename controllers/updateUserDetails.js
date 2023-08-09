const Users = require("../models/userModel");

const updateUserDetails = async(req, res)=>{
    try{
        const {name, email, phone} = req.body;
        const {id} = req.params;
        

        const updateUser = await Users.findByIdAndUpdate(
            {_id: id},
            {$set:{
                name: name,
                email: email,
                phone: phone
            }},
            {new: true}
        )

        res.status(200).send({
            success: true,
            message: "User Details Update Successfully!",
            user: {
                id: updateUser._id,
                name: updateUser.name,
                email: updateUser.email,
                phone: updateUser.phone,
                address: updateUser.address,
                flatno: updateUser.flatno,
                landmark: updateUser.landmark
            }
        })

    }
    catch(err){
        res.status(200).send({
            success: false,
            message: "User Address doesn't updated !",
            err
        })
    }
}
module.exports = {updateUserDetails};