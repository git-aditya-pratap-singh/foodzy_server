const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },

    email:{
        type: String,
        required: true,
        unique: true
    },

    phone:{
        type: String,
        required: true
    },

    password:{
        type: String,
        required: true

    },

    address:{
        type: String,
        default: ""
    },

    flatno:{
        type: String,
        default: ""
    },

    landmark:{
        type: String,
        default: ""
    },

    favItem:{
        type : Array,
        default : []
    }


})


module.exports = mongoose.model("Users", userSchema);