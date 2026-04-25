const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")
const dataSchema = require("../validators/userData.validator")
const bcrypt = require("bcrypt")

async function signup(req,res) {
    try {
        const isVaildData = await dataSchema.safeParse(req.body);
        if(!isVaildData.success){
            return res.status(403).json({
                message : isVaildData.error.errors.map(e=>e.message)
            })
        }

        const{username,email,password} = isVaildData.data;

        const isUserExisist = await userModel.findOne({
            $or:[{email},{username}]
        })

        if(isUserExisist){
            return res.status(401).json({
                message : "user already exisist please login"
            })
        }

        const passEncrypt = await bcrypt.hash(password, parseInt(process.env.SALT))
        const result = await userModel.create({
            username,email,password:passEncrypt
        })

        res.status(201).json({
            message : "account is created"
        })

        
    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
}

async function login(req,res) {
    try {
        const isVaildData = await dataSchema.safeParse(req.body)
        if(!isVaildData.success){
            return res.status(401).json({
                message : isVaildData.error.errors.map(e=>e.message)
            })
        }

        const{username,email,password} = isVaildData.data
        const result = await userModel.findOne({
            $or:[{username},{email}]
        })

        if(!result){
            return res.status(403).json({
                message : "user doesn't exisist please register"
            })
        }

        const isVaildPass = await bcrypt.compare(password,result.password)
        if(!isVaildPass){
            return res.status(403).json({
                message : "incorrect password"
            })
        }
        const token = await jwt.sign({id:result._id},process.env.JWT_SECRET);
        res.cookie("token",token);

        res.status(201).json({
            message : "user login successful"
        })

    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
}

module.exports = {signup,login}