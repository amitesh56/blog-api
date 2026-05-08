const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
    reply: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 300
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },

    comment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment",
        required: true
    }

}, { timestamps: true });

replySchema.index({ comment: 1 });

const replyModel = mongoose.model("reply", replySchema);

module.exports = replyModel;