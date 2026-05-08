const mongoose = require("mongoose")
const commentModel = require("../models/comment.model")
const blogModel = require("../models/blog.model")
const commentValidator = require("../validators/commentData.validator")

async function commentPost(req, res) {
    try {
        const owner = req.user.id;
        const blog = req.params.id;

         if (!mongoose.Types.ObjectId.isValid(blog)) {
            return res.status(400).json({
                message: "Invalid blog ID"
            });
        }

        const blogExists = await blogModel.findById(blog);
        if (!blogExists) {
            return res.status(404).json({ message: "Blog not found" });
        }

        const isValidComment = commentValidator.safeParse(req.body);
        if (!isValidComment.success) {
            return res.status(422).json({
                message: isValidComment.error.errors.map(e => e.message)
            });
        }

        const { comments } = isValidComment.data;

        const result = await commentModel.create({
            comments,
            owner,
            blog
        });

        res.status(201).json({
            message: "Comment created",
            comment: result
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
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

async function updateComment(req, res) {
    try {
        const owner = req.user.id;
        const commentId = req.params.id;

        const isValidComment = commentValidator.safeParse(req.body);
        if (!isValidComment.success) {
            return res.status(422).json({
                message: isValidComment.error.errors.map(e => e.message)
            });
        }

        const { comments } = isValidComment.data;

        const result = await commentModel.findOneAndUpdate(
            { _id: commentId, owner },
            { $set: { comments } },
            { new: true, runValidators: true }
        );

        if (!result) {
            return res.status(404).json({
                message: "Comment not found or not authorized"
            });
        }

        res.status(200).json({
            message: "Comment updated",
            comment: result
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function deleteComment(req, res) {
    try {
        const owner = req.user.id;
        const commentId = req.params.id;

        const result = await commentModel.findOneAndDelete({
            _id: commentId,
            owner
        });

        if (!result) {
            return res.status(404).json({
                message: "Comment not found or not authorized"
            });
        }

        res.status(200).json({
            message: "Comment deleted successfully",
            comment: result
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {commentPost,getAllComments,updateComment,deleteComment}