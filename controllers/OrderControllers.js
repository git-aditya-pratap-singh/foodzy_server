const Orders = require("../models/userOrder");

const OrderControllers = async(req, res)=>{
    try{
        const email = req.params.email;
        
        await Orders.find({emailID : email})
        
        .then((response)=>{
           res.status(200).send({
             success : true,
             response
           })
        })
        .catch((err)=>{
            res.status(200).send({
                success : false,
                message: "Error while getting my Orders"
            })
        })
    }
    catch(err){
        console.log(err);
    }
}
module.exports = {OrderControllers};