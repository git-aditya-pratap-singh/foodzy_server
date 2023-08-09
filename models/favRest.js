const mongoose = require("mongoose");

const favSchema = new mongoose.Schema({
    emailID:{
        type : String,
        trim :true
    },
    favItem:{
        type : Array,
        default : []
    }
})
module.exports = mongoose.model("favdata", favSchema);