const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    emailID:{
        type : String,
        trim :true
    },

    orderID:{
        type : String,
        trim: true
    },

    paymentID:{
        type : String,
        trim: true
    },

    payments : {
        type : String,
        trim :true
    },

    ordersItem:{
        type : Array,
        default : []
    }

})

module.exports = mongoose.model("Orders", orderSchema);