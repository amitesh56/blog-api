const express = require("express");

const replyController = require("../controllers/reply.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();



router.post(
    "/comments/:id/replies",
    authMiddleware.authUser,
    replyController.createReply
);



router.get(
    "/comments/:id/replies",
    replyController.getAllReplies
);


router.put(
    "/replies/:id",
    authMiddleware.authUser,
    replyController.updateReply
);



router.delete(
    "/replies/:id",
    authMiddleware.authUser,
    replyController.deleteReply
);


module.exports = router;