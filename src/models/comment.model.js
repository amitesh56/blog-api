const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    comments : {
        type : String
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    },

    blog : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "blog"
    }
},{timestamps:true})


const commentModel = mongoose.model("comment", commentSchema);

module.exports = commentModel