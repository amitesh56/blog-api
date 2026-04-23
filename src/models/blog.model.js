const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {
        type : String,
        required : true,
        unique : true
    },
    content : {
        type : String,
        required : true
    },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    },
    coverImage : {
        type : String
    }
},{timestamps:true})


const blogModel = mongoose.model("blog",blogSchema);

module.exports = blogModel;