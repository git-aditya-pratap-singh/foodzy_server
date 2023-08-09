const favdata = require("../models/favRest");

const FavDelete = async(req, res)=>{
    try{
        const id = req.params.id;
        
        await favdata.deleteOne({_id : id})
        res.status(200).send({
            success:true,
            message:"Favourite Restaurent has been Deleted!"
        })

    }
    catch(err){
        console.log(err)
        res.status(200).send({
            success:false,
            message:"Favourite Restaurent has not been Deleted!",
            err
        })
    }
}
module.exports = {FavDelete};