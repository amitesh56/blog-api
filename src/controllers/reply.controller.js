const mongoose = require("mongoose");
const replyModel = require("../models/replys.model");
const commentModel = require("../models/comment.model");
const validReply = require("../validators/reply.validator");


async function createReply(req, res) {
    try {
        const owner = req.user.id;
        const comment = req.params.id;

      
        if (!mongoose.Types.ObjectId.isValid(comment)) {
            return res.status(400).json({
                message: "Invalid comment ID"
            });
        }

        
        const commentExists = await commentModel.findById(comment);

        if (!commentExists) {
            return res.status(404).json({
                message: "Comment not found"
            });
        }

       
        const isValidReply = validReply.safeParse(req.body);

        if (!isValidReply.success) {
            return res.status(422).json({
                message: isValidReply.error.errors.map(e => e.message)
            });
        }

        const { reply } = isValidReply.data;

        
        const result = await replyModel.create({
            reply,
            owner,
            comment
        });

        res.status(201).json({
            message: "Reply created",
            reply: result
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}


async function getAllReplies(req, res) {
    try {
        const comment = req.params.id;

        
        if (!mongoose.Types.ObjectId.isValid(comment)) {
            return res.status(400).json({
                message: "Invalid comment ID"
            });
        }

        
        const commentExists = await commentModel.findById(comment);

        if (!commentExists) {
            return res.status(404).json({
                message: "Comment not found"
            });
        }

        
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const skip = (page - 1) * limit;

        const replies = await replyModel.find({ comment })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate("owner", "name")
            .select("reply owner createdAt");

        res.status(200).json({
            page,
            limit,
            count: replies.length,
            replies
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}


async function updateReply(req, res) {
    try {
        const owner = req.user.id;
        const replyId = req.params.id;

        
        if (!mongoose.Types.ObjectId.isValid(replyId)) {
            return res.status(400).json({
                message: "Invalid reply ID"
            });
        }

       
        const isValidReply = validReply.safeParse(req.body);

        if (!isValidReply.success) {
            return res.status(422).json({
                message: isValidReply.error.errors.map(e => e.message)
            });
        }

        const { reply } = isValidReply.data;

        
        const result = await replyModel.findOneAndUpdate(
            { _id: replyId, owner },
            { $set: { reply } },
            { new: true, runValidators: true }
        );

        if (!result) {
            return res.status(404).json({
                message: "Reply not found or not authorized"
            });
        }

        res.status(200).json({
            message: "Reply updated",
            reply: result
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}


async function deleteReply(req, res) {
    try {
        const owner = req.user.id;
        const replyId = req.params.id;

        
        if (!mongoose.Types.ObjectId.isValid(replyId)) {
            return res.status(400).json({
                message: "Invalid reply ID"
            });
        }

        
        const result = await replyModel.findOneAndDelete({
            _id: replyId,
            owner
        });

        if (!result) {
            return res.status(404).json({
                message: "Reply not found or not authorized"
            });
        }

        res.status(200).json({
            message: "Reply deleted successfully",
            reply: result
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = {
    createReply,
    getAllReplies,
    updateReply,
    deleteReply
};
