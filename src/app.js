const express = require("express");
const cookieParser = require("cookie-parser");


const authRoutes = require("./routes/auth.routes");
const blogRoutes = require("./routes/blog.routes");
const commentRoutes = require("./routes/comment.routes");
const replyRoutes = require("./routes/reply.routes");

const app = express();


// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());




// HEALTH CHECK ROUTE
app.get("/", (req, res) => {
    res.status(200).json({
        message: "API is running"
    });
});



app.use("/api/auth", authRoutes);

app.use("/api/blogs", blogRoutes);

app.use("/api/blogs", commentRoutes);

app.use("/api", replyRoutes);


// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
});


// 404 ROUTE HANDLER
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});


module.exports = app;