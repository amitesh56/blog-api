const express = require("express");

const commentController = require("../controllers/comment.controller");
const authMiddleware = require("../middleware/token.auth");

const router = express.Router();



router.post(
    "/:id/comments",
    authMiddleware,
    commentController.commentPost
);



router.get(
    "/:id/comments",
    commentController.getAllComments
);



router.put(
    "/comments/:id",
    authMiddleware,
    commentController.updateComment
);



router.delete(
    "/comments/:id",
    authMiddleware,
    commentController.deleteComment
);


module.exports = router;