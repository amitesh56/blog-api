const express = require("express");
const multer = require("multer");

const blogController = require("../controllers/blog.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();


const upload = multer({
    storage: multer.memoryStorage()
});



router.post(
    "/",
    authMiddleware.authUser,
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
    authMiddleware.authUser,
    upload.single("coverImage"),
    blogController.updateBlog
);



router.delete(
    "/:id",
    authMiddleware.authUser,
    blogController.deleteBlog
);


module.exports = router;