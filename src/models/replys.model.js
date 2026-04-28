const mongoose = require("mongoose")

const replySchema = new mongoose.Schema({
    reply : {
        type : String,
        required : true
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    },

    comment : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "comment"
    }
},{timestamps:true})


const replyModel = mongoose.model("reply", replySchema);

module.exports = replyModel