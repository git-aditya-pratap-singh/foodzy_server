const mongoose = require("mongoose");
require("dotenv").config();

const connectToDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser : true,
            useUnifiedTopology : true,
        });
        console.log("Connected to mongoDB Database");
        return conn;
    }
    catch (err) {
        console.log(err);
        throw new Error("failed to connect to database");
    }

}

module.exports = {connectToDB};
