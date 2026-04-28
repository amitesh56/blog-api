const blogModel = require("../models/blog.model")
const verifyData = require("../validators/blogData.validator")
const imageUpload = require("../services/cloudinary.image");


async function createBlog(req,res) {
    try {
        const owner = req.user.id;
        const blogData =  verifyData.safeParse(req.body);
        if(!blogData.success){
            return res.status(422).json({
                message : blogData.error.errors.map(e=>e.message)
            })
            
        }
        const {title , content} = blogData.data
        const imageFile = req.file;

        const result = await blogModel.findOne({title})
        if(result){
           return res.status(409).json({
                message : "this article already exisist"
            })
        }

        let coverImage;
            if(imageFile){
                coverImage = await imageUpload(imageFile)
            }

        
        
        const createdBlogInDB = await blogModel.create({
            title,content,author:owner, coverImage
        })

        res.status(201).json({
            message : "blog is created",
            createdBlogInDB
        })
        



    } catch(error){
        res.status(500).json({
            message : error.message
        })
    }
    

}



module.exports = {createBlog}