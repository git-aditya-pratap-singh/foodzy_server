const favdata = require("../models/favRest");
const getFavrioteController = async(req, res)=>{
    try{
        const email = req.params.email;

        await favdata.find({emailID: email}) 
        .then((response)=>{
            res.status(200).send({
                success: true,
                response
            })
        
        })
        .catch((err)=>{
            res.status(200).send({
                success : false,
                message: "Error while getting my favorites"
            })
        })

    }
    catch(err){
        console.log(err);
    }

}
module.exports = {getFavrioteController};