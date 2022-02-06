const mongoose = require("mongoose");

const personalSchema = mongoose.Schema({
    name:{
        type : String,
    },
    email : {
        type : String
    },
    mobile : {
        type : String,
        unique : true
    }
})  

module.exports = mongoose.model("personal", personalSchema);