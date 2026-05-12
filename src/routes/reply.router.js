const express = require("express");

const replyController = require("../controllers/reply.controller");
const authMiddleware = require("../middleware/token.auth");

const router = express.Router();



router.post(
    "/comments/:id/replies",
    authMiddleware,
    replyController.createReply
);



router.get(
    "/comments/:id/replies",
    replyController.getAllReplies
);


router.put(
    "/replies/:id",
    authMiddleware,
    replyController.updateReply
);



router.delete(
    "/replies/:id",
    authMiddleware,
    replyController.deleteReply
);


module.exports = router;