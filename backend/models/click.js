const mongoose = require("mongoose");

const clickSchema = mongoose.Schema({
    addClicks : {
        type : Number,
        default : 0
    },
    updateClicks : {
        type : Number,
        default : 0
    }
})  

module.exports = mongoose.model("click", clickSchema);