const express = require("express");
const multer = require("multer");

const blogController = require("../controllers/blog.controller");
const authMiddleware = require("../middleware/token.auth");

const router = express.Router();


const upload = multer({
    storage: multer.memoryStorage()
});



router.post(
    "/",
    authMiddleware,
    upload.single("coverImage"),
    blogController.createBlog
);



router.get(
    "/",
    blogController.getAllBlog
);



router.get(
    "/:id",
    blogController.getSingleBlog
);



router.put(
    "/:id",
    authMiddleware,
    upload.single("coverImage"),
    blogController.updateBlog
);



router.delete(
    "/:id",
    authMiddleware,
    blogController.deleteBlog
);


module.exports = router;