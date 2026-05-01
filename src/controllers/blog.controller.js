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

async function getSingleBlog(req,res) {
    try {
        const blogId = req.params.id ;
        const isBlogexisist = await blogModel.findById(blogId)
        if(!isBlogexisist){
            return res.status(404).json({
                message : "This blog does not exisist"
            })
        }
        res.status(200).json({
            isBlogexisist
        })
        
    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
}

async function getAllBlog(req,res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const blog = await blogModel.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit);
        res.status(200).json({
            
            page,
            limit,
            count: blogs.length,
            blogs
           
        })
        
        
    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
}

async function updateBlog(req, res) {
    try {
        const blogId = req.params.id;
        const owner = req.user.id;

        const blogData = verifyData.safeParse(req.body);

        if (!blogData.success) {
            return res.status(422).json({
                message: blogData.error.errors.map(e => e.message)
            });
        }

        const { title, content } = blogData.data;

        const updateFields = { title, content };

        if (req.file) {
            updateFields.coverImage = await imageUpload(req.file);
        }

        const updatedBlog = await blogModel.findOneAndUpdate(
            { _id: blogId, author: owner },
            updateFields,
            { new: true, runValidators: true }
        );

        if (!updatedBlog) {
            return res.status(404).json({
                message: "Blog not found or not authorized"
            });
        }

        res.status(200).json({
            message: "Blog updated successfully",
            blog: updatedBlog
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

async function deleteBlog(req, res) {
    try {
        const blogId = req.params.id;
        const owner = req.user.id;

        const deletedBlog = await blogModel.findOneAndDelete({
            _id: blogId,
            author: owner
        });

        if (!deletedBlog) {
            return res.status(404).json({
                message: "Blog not found or not authorized"
            });
        }

        res.status(200).json({
            message: "Blog deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = {createBlog , getSingleBlog , getAllBlog , updateBlog, deleteBlog}