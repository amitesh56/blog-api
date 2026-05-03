const commentModel = require("../models/comment.model")
const blogModel = require("../models/blog.model")
const commentValidator = require("../validators/commentData.validator")

async function commentPost(req,res) {
    try {
        const owner = req.user;
        const blog = req.params.id;

        const blogExists = await blogModel.findById(blog);
        if (!blogExists) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }

        const isvalidComment = commentValidator.safeParse(req.body)
        if(!isvalidComment.success){
            return res.status(422).json({
                message : isvalidComment.error.errors.map(e=>e.message)
            })
        }

        const comments = isvalidComment.data;
        const result = await commentModel.create({comments,owner,blog})

        res.status(201).json({
            message : "comment is created",
            result
        })
        
    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
    
}

async function getAllComments(req,res) {
    try {
        
        const blog = req.params.id;

        const blogExists = await blogModel.findById(blog);
        if (!blogExists) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }

        const page = parseInt( req.query.page) || 1;
        const limit = 10;
        const skip = (page-1)*limit;

        const comments = await commentModel.find({blog})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("owner", "name")
        .select("comments owner createdAt");

        res.status(200).json({
            page,
            limit,
            count: comments.length,
            comments
        })

    } catch (error) {
        res.status(500).json({
            message : error.message 
        })
    }
}

