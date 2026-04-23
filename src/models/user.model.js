const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        minLength : [6 , "username should be 6 character long"]
    },
    email : {
        type : String,
        required : true,
        unique : [true , "email already exisist please login"]
    },
    password : {
        type : String,
        required : true,
        minLength : [6 , "password should be at least 6 letter long"]
    }
},{timestamps:true})

const userModel = mongoose.model("user",userSchema);

module.exports = userModel