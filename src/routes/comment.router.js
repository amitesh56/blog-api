const express = require("express");

const commentController = require("../controllers/comment.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();



router.post(
    "/:id/comments",
    authMiddleware.authUser,
    commentController.commentPost
);



router.get(
    "/:id/comments",
    commentController.getAllComments
);



router.put(
    "/comments/:id",
    authMiddleware.authUser,
    commentController.updateComment
);



router.delete(
    "/comments/:id",
    authMiddleware.authUser,
    commentController.deleteComment
);


module.exports = router;