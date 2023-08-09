const Users = require('../models/userOrder');

const orderDelete = async(req, res)=>{
    const Id = req.params.id;

    try{
        await Users.deleteOne({orderID : Id})
        res.status(200).send({
            success:true,
            message:"Order is Cancelled !"
        })
    
    }
    catch (error) {
        console.log(error)
        res.status(200).send({
            success:false,
            message:"Order is not Cancelled !",
            error
        })
    }  

}
module.exports = {orderDelete}