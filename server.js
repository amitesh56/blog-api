require("dotenv").config()
const app = require("./src/app");
const connectDB = require("./src/db/db");

(async () => {
    await connectDB();
    app.on("error",(error)=>{
        console.error("ERROR ," + error.message);
        throw error;
    })
    app.listen(process.env.PORT, ()=>{
    console.log("server is running")
})
})();

