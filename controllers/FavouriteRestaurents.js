const favdata = require('../models/favRest');

const FavouriteRestaurents = async(req, res)=>{
    try{
        const {email} = req.params;
        const data = req.body.favData;
        
        await new favdata({
            emailID: email,
            favItem: data 
        }).save()

        res.status(200).send({
            success: true,
            message: "Addeed Successfully!"
        })

    }
    catch(err){
        res.status(200).send({
            success: false,
            message: "No Added !",
            err
        })
    }
       
    

}
module.exports={FavouriteRestaurents};